import Image1 from "../../assets/Images/black-friday.png";
import Image2 from "../../assets/Images/mobile-shopping.png";
import Image3 from "../../assets/Images/shop.png";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto %50 off on all mens wear",
  },
  {
    id: 2,
    img: Image2,
    title: "Upto %50 off on all mens wear",
  },
  {
    id: 3,
    img: Image3,
    title: "Upto %50 off on all mens wear",
  },
];

const Hero = ({ handleOrderPopup }) => {
  var Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div
      className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 
                    flex justify-center items-center
                     dark:bg-slate-950 dark:text-white duration-300"
    >
      <div className="h-[700px] w-[700px] bg-gradient-to-r from-primary to-secondary  absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
      <div className="container pb-8 sm:pb-0">
        <Slider {...Settings}>
          {ImageList.map((data, i) => (
            <div key={i}>
              <div className=" grid grid-cols-1 sm:grid-cols-2">
                <div className=" flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-once="true"
                    className=" text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="100"
                    className=" text-sm "
                  >
                    {data.description}
                  </p>

                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="300"
                  >
                    <button
                      onClick={() => {
                        handleOrderPopup;
                      }}
                      className=" bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 rounded-full"
                    >
                      order now
                    </button>
                  </div>
                </div>
                <div className="order-1 sm:order-2">
                  <div
                    className=" relative z-10"
                    data-aos="zoom-in"
                    data-aos-once="true"
                  >
                    <img
                      src={data.img}
                      alt="slider images"
                      className="w-[300px] h-[300px] sm:h-[450px] 
                                                                                sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
