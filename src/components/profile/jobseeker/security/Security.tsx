import ChangeCurrentPassword from './ChangeCurrentPassword';

export default function Security() {
  return (
    <div className="min-h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between px-5 md:p-10">
        <p className="font-bold text-pink-500">Security</p>
        <div className="my-10 flex flex-col items-start">
          <ChangeCurrentPassword />
        </div>
      </div>
    </div>
  );
}
