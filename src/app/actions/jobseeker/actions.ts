'use server';

import { authOptions, CustomSession } from '@/lib/auth';
import {
  LinkUpdateSchema,
  LinkUpdateSchemaType,
  PersonalInfoSchema,
  PersonalInfoSchemaType,
} from '@/lib/validators/profile.validator';
import {
  ProjectEditSchema,
  ProjectEditSchemaType,
  ProjectSchema,
  ProjectSchemaType,
} from '@/lib/validators/project.validator';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { toast } from 'sonner';

const prisma = new PrismaClient();

export const getJobseekerInfo = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }
    const customSession = session as CustomSession;

    const jobSeekerDetails = await prisma.jobSeeker.findUnique({
      where: {
        id: customSession.user.id,
      },
      omit: {
        password: true,
      },
      include: {
        projects: true,
        previousCompanies: true,
      },
    });

    if (!jobSeekerDetails) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    console.log(jobSeekerDetails);
    return {
      success: true,
      jobSeekerProfile: jobSeekerDetails,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const updateJobseekerInfo = async (data: PersonalInfoSchemaType) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;
    const parsed = PersonalInfoSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: 'failed to parse object',
      };
    }

    console.log(parsed.data);

    const user = await prisma.jobSeeker.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'user not found',
      };
    }

    const changedData = Object.fromEntries(
      Object.entries(parsed.data).filter(([key, value]) => {
        return value !== user[key as keyof typeof user];
      }),
    );

    console.log(changedData);

    if (Object.keys(changedData).length === 0) {
      console.log('No changes detected');
      return {
        success: false,
        error: 'no changes applied',
      };
    }

    await prisma.jobSeeker.update({
      where: {
        id,
      },
      data: changedData,
    });

    return {
      success: true,
      message: 'Profile updated',
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const addJobseekerSkill = async (skill: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    if (!skill) {
      return {
        success: false,
        error: 'Bad request',
      };
    }

    const lowerCaseSkillString = skill.toLowerCase();

    const customSession = session as CustomSession;
    const id = customSession.user.id;

    const user = await prisma.jobSeeker.findUnique({
      where: {
        id,
      },
      select: {
        skills: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'user not found',
      };
    }

    const skills = user.skills;

    if (skills.includes(lowerCaseSkillString)) {
      return {
        success: false,
        error: 'skill already exists',
      };
    }

    await prisma.jobSeeker.update({
      where: {
        id,
      },
      data: {
        skills: {
          push: lowerCaseSkillString,
        },
      },
    });

    return {
      success: true,
      message: 'Skill added',
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const deleteJobseekerSkill = async (skill: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    if (!skill) {
      return {
        success: false,
        error: 'Bad request',
      };
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;
    const lowerCaseSkillString = skill.toLowerCase();

    const user = await prisma.jobSeeker.findUnique({
      where: {
        id,
      },
      select: {
        skills: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'user not found',
      };
    }

    const skills = user.skills;

    const updatedSkills = skills.filter((sk) => sk !== lowerCaseSkillString);

    await prisma.jobSeeker.update({
      where: {
        id,
      },
      data: {
        skills: updatedSkills,
      },
    });

    return {
      success: true,
      message: 'Skill Removed',
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const addProject = async (data: ProjectSchemaType) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const parsed = ProjectSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: 'Bad request',
      };
    }

    const { title, description, githubURL, deployedLink, skills } = parsed.data;

    const customSession = session as CustomSession;
    const id = customSession.user.id;

    const isProjectExist = await prisma.project.findUnique({
      where: {
        title,
        jobSeekerId: id,
      },
    });

    if (isProjectExist) {
      return {
        success: false,
        error: 'Project with this title already exists',
      };
    }

    const project = await prisma.project.create({
      data: {
        jobSeekerId: id,
        title,
        deployedLink,
        description,
        githubURL,
        skills,
      },
    });

    console.log(project);
    return {
      success: true,
      message: 'Project added',
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;

    await prisma.project.delete({
      where: {
        id: projectId,
        jobSeekerId: id,
      },
    });

    return {
      success: true,
      message: 'Project deleted Successfully',
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const editProject = async (
  data: ProjectEditSchemaType,
  projectId: string,
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const parsed = ProjectEditSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: 'Bad request',
      };
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;

    const { title, description, githubURL, deployedLink, skills } = parsed.data;

    console.log('Parsed data:', parsed.data);
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        jobSeekerId: id,
      },
    });

    if (!project) {
      return {
        success: false,
        error: 'Project not found',
      };
    }

    const hasChanged = isAnyFieldChanged(
      project as ProjectEditSchemaType,
      parsed.data,
    );

    if (!hasChanged) {
      return {
        success: false,
        error: 'No changes applied',
      };
    }

    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        title,
        description,
        deployedLink,
        githubURL,
        skills,
      },
    });

    return {
      success: true,
      message: 'Project details updated',
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const addOrEditLinks = async (data: LinkUpdateSchemaType) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const parsed = LinkUpdateSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: 'Bad request',
      };
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;

    const { title, link } = parsed.data;

    const fieldMap: Record<string, string> = {
      Github: 'githubLink',
      Twitter: 'twitterLink',
      Linkedin: 'linkedinLink',
      Portfolio: 'portfolioLink',
    };

    const fieldToUpdate = fieldMap[title];
    if (!fieldToUpdate) {
      return {
        success: false,
        error: 'Bad request',
      };
    }

    if (fieldToUpdate) {
      await prisma.jobSeeker.update({
        where: {
          id,
        },
        data: {
          [fieldToUpdate]: link,
        },
      });
    }

    return {
      success: true,
      message: 'Link saved successfully',
    };
  } catch (err) {
    console.error('err adding or updating link :', err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

const isAnyFieldChanged = (
  existingData: ProjectEditSchemaType,
  newData: ProjectEditSchemaType,
) => {
  const isTitleChanged = existingData.title !== newData.title;
  const isDescChanged = existingData.description !== newData.description;
  const isDeployedLinkChanged =
    existingData.deployedLink !== newData.deployedLink;
  const isGithubUrlChanged = existingData.githubURL !== newData.githubURL;

  const isSkillsChanged = !(
    newData.skills.length === existingData.skills.length &&
    newData.skills.every((skill, index) => skill === existingData.skills[index])
  );

  return (
    isTitleChanged ||
    isDescChanged ||
    isGithubUrlChanged ||
    isDeployedLinkChanged ||
    isSkillsChanged
  );
};

const GITHUB = 'Github';
const TWITTER = 'Twitter';
const LINKEDIN = 'Linkedin';
const PORTFOLIO = 'Portfolio';
