import Program from "@/app/(public)/programs/full/[id]/page";

const Page = async (Props: { params: Promise<{ id: string }> }) => {
  return <Program {...Props} />;
};
export default Page;
