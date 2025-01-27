import { MapPinned } from "lucide-react";

interface InformationProps {
  title: string;
  speaker: string;
  location: string;
  date: Date;
  subtitle: string;
  image?: string;
  altText: string;
}

const InformationCard = ({ title, speaker, location }: InformationProps) => {
  return (
    <div
      className={
        "flex basis-1/3 flex-col rounded-3xl bg-secondary" + " overflow-hidden"
      }
    >
      <div
        className={`flex h-[200px] w-full flex-col justify-end bg-[url("../public/informations/alquran.jpg")] bg-cover bg-center p-4`}
      >
        <div
          className={
            "h-24 w-full rounded-xl p-4 backdrop-blur-sm" + " bg-white/15"
          }
        >
          <div className="flex w-full gap-2 text-white">
            <div className={"flex flex-col justify-center"}>
              <p className={"text-xl font-bold"}>Kismala</p>
              <p>Kajian Tematik Islam Menjelang Maghrib</p>
            </div>
            <div>
              <p className={"rounded-md bg-emerald-500 p-1 text-white"}>
                Hari ini
              </p>
              <p className={"text-center"}>16.00</p>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex grow flex-col p-4"}>
        <div className={"mb-2"}>
          <h3 className={"text-2xl font-medium"}>{title}</h3>
          <p>{speaker}</p>
        </div>
        {/*<p>{subtitle}</p>*/}
        <div className={"flex grow items-end gap-2"}>
          <div
            className={
              "grid size-12 place-content-center rounded-xl bg-primary"
            }
          >
            <MapPinned className={"text-white"} />
          </div>
          <div
            className={
              "my- flex h-12 w-full items-center bg-white px-4" +
              " rounded-xl" +
              " font-medium"
            }
          >
            {location}
          </div>
        </div>
        {/*<p>Date: {date.toLocaleDateString()}</p> /!* Format tanggal *!/*/}
      </div>
    </div>
  );
};
export default InformationCard;
