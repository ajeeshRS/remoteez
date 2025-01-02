-- CreateEnum
CREATE TYPE "ExperienceRange" AS ENUM ('ZERO_TO_ONE', 'ONE_TO_THREE', 'THREE_TO_SIX', 'SIX_PLUS');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('PART_TIME', 'FULL_TIME', 'FREELANCE', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HR', 'CEO', 'FOUNDER');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('INR', 'USD');

-- CreateTable
CREATE TABLE "JobSeeker" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "bio" TEXT,
    "githubLink" TEXT,
    "portfolioLink" TEXT,
    "linkedinLink" TEXT,
    "twitterLink" TEXT,
    "skills" TEXT[],
    "resume" TEXT,
    "desiredJobTitle" TEXT NOT NULL,
    "experienceRange" "ExperienceRange" NOT NULL,
    "location" TEXT NOT NULL,
    "preferredJobType" "JobType",

    CONSTRAINT "JobSeeker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "jobSeekerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "githubURL" TEXT,
    "deployedLink" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skills" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousCompany" (
    "id" TEXT NOT NULL,
    "jobSeekerId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyWebsite" TEXT,
    "duration" TEXT NOT NULL,

    CONSTRAINT "PreviousCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyLocation" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "logo" TEXT,
    "foundedYear" INTEGER,
    "teamSize" INTEGER,
    "description" TEXT,

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLinks" (
    "id" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "twitter" TEXT,
    "linkedin" TEXT,
    "website" TEXT,

    CONSTRAINT "SocialLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "minExperience" INTEGER NOT NULL,
    "maxExperience" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyLogo" TEXT NOT NULL,
    "companyDescription" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "skillsRequired" TEXT[],
    "minSalary" INTEGER NOT NULL,
    "maxSalary" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'INR',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applied" (
    "id" TEXT NOT NULL,
    "jobSeekerId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Applied_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "jobSeekerId" TEXT NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobSeeker_id_key" ON "JobSeeker"("id");

-- CreateIndex
CREATE UNIQUE INDEX "JobSeeker_email_key" ON "JobSeeker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "PreviousCompany_id_key" ON "PreviousCompany"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_id_key" ON "Employer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_email_key" ON "Employer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLinks_id_key" ON "SocialLinks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLinks_employerId_key" ON "SocialLinks"("employerId");

-- CreateIndex
CREATE UNIQUE INDEX "Job_id_key" ON "Job"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Applied_jobSeekerId_key" ON "Applied"("jobSeekerId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_jobSeekerId_fkey" FOREIGN KEY ("jobSeekerId") REFERENCES "JobSeeker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousCompany" ADD CONSTRAINT "PreviousCompany_jobSeekerId_fkey" FOREIGN KEY ("jobSeekerId") REFERENCES "JobSeeker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLinks" ADD CONSTRAINT "SocialLinks_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applied" ADD CONSTRAINT "Applied_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_jobSeekerId_fkey" FOREIGN KEY ("jobSeekerId") REFERENCES "JobSeeker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
