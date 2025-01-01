import BannerImg from "../../assets/Images/Banner.png";
const Banner = () => {
  return (
    <div className="min-h-[530px] flex justify-center items-center py-12 sm:py-0">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div data-aos="zoom-in">
            <img
              className="max-w-[500px] h-[450px] w-full mx-auto object-cover"
              src={BannerImg}
              alt="Banner img"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 ">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold ">
              Winter sale upto 50% off{" "}
            </h1>
            <p
              data-aos="fade-up"
              className="text-sm text-gray-500 tracking-wide leading-5"
            >
              Commodo non duis non in minim. Sit voluptate nisi aute cupidatat.
              Amet adipisicing reprehenderit velit ad voluptate et exercitation
              commodo ex cillum ea. Nostrud culpa aliquip reprehenderit laboris
              eu. Quis laboris reprehenderit Lorem cupidatat aliqua ipsum ex
              laborum ea. Qui sint sint ad eiusmod voluptate in velit
              consectetur culpa occaecat consectetur aute nostrud anim.
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
