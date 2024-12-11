import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link, Pen } from 'lucide-react';
export default function Links({ links }: any) {
  return (
    <div className="min-h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between p-10">
        <p className="font-bold text-pink-500"> Links</p>
        <div>
          {links?.length !== 0 ? (
            links?.map((link: any, i: number) => (
              <div key={i} className="flex flex-col items-start">
                <p className="flex items-start py-5">
                  <span className="pr-2">{link.key}</span>
                  <Sheet key={link.key}>
                    <SheetTrigger asChild>
                      <span className="mx-2 cursor-pointer bg-pink-400 p-1 hover:bg-pink-500">
                        <Pen className="h-4 w-4" />
                      </span>
                    </SheetTrigger>
                    <SheetContent
                      side={'right'}
                      className="h-full overflow-y-scroll border-l-pink-400/40 bg-black py-10"
                    >
                      <SheetHeader>
                        <SheetTitle className="text-white">
                          Edit {link.key}
                        </SheetTitle>
                      </SheetHeader>
                      <div className="flex h-fit w-full flex-col overflow-y-scroll py-10">
                        <div className="flex w-full flex-col">
                          <label className="my-1 py-2 text-sm text-neutral-200">
                            URL
                          </label>
                          <input
                            type="text"
                            className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
                            defaultValue={
                              link.value !== 'not added yet' && link.value
                                ? link.value
                                : `enter your ${link.key} url`
                            }
                          />
                        </div>
                        <SheetClose className="my-10 bg-white py-2 hover:bg-neutral-300">
                          Save
                        </SheetClose>
                      </div>
                    </SheetContent>
                  </Sheet>
                </p>
                <p className="flex items-center text-sm underline">
                  <Link className="mr-1 h-3 w-3" /> {link.value}
                </p>
              </div>
            ))
          ) : (
            <p>no links added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
