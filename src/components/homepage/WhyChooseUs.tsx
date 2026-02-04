import Image from "next/image";
import WhyChooseUsImage from "../../../public/media/bg/why-choose.png";
import Material from "../../../public/media/icons/material.png";
import Design from "../../../public/media/icons/design.png";
import Expert from "../../../public/media/icons/Expert.png";
import Sustainable from "../../../public/media/icons/Sustainable.png";
import Unmatched from "../../../public/media/icons/Unmatched.png";
import Customization from "../../../public/media/icons/Customization.png";
export default function WhyChooseUs() {
    return (
        <>
            <section className="relative md:py-16 py-8">
                <Image
                    src={WhyChooseUsImage}
                    alt="why choose us"
                    fill
                    className="object-cover z-0"
                />
                <div className="container relative z-10 ">
                    <h2 className="text-center text-white sm:text-3xl text-2xl font-bold mb-10">Why Choose Us</h2>
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 sm:gap-x-8 gap-x-4 sm:gap-y-12 gap-y-6">
                        <div className="sm:text-start text-center">
                            <Image
                                src={Material}
                                alt="Material Range"
                                width={80}
                                height={80}
                                className="mb-5 sm:mx-0 mx-auto"
                            />
                            <h4 className="sm:text-xl text-lg font-semibold text-white mb-3">Extensive Material Range</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s</p>
                        </div>
                        <div className="sm:text-start text-center">
                            <Image
                                src={Design}
                                alt="Design"
                                width={80}
                                height={80}
                                className="mb-5 sm:mx-0 mx-auto"
                            />
                            <h4 className="sm:text-xl text-lg font-semibold text-white mb-3">Unique Designs</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s</p>
                        </div>
                        <div className="sm:text-start text-center">
                            <Image
                                src={Expert}
                                alt="Expert Guidance"
                                width={80}
                                height={80}
                                className="mb-5 sm:mx-0 mx-auto"
                            />
                            <h4 className="sm:text-xl text-lg font-semibold text-white mb-3">Expert Guidance</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s</p>
                        </div>
                        <div className="sm:text-start text-center">
                            <Image
                                src={Sustainable}
                                alt="Sustainable Sourcing"
                                width={80}
                                height={80}
                                className="mb-5 sm:mx-0 mx-auto"
                            />
                            <h4 className="sm:text-xl text-lg font-semibold text-white mb-3">Sustainable Sourcing</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s</p>
                        </div>
                        <div className="sm:text-start text-center">
                            <Image
                                src={Unmatched}
                                alt="Unmatched Quality"
                                width={56}
                                height={70}
                                className="mb-5 sm:mx-0 mx-auto"
                            />
                            <h4 className="sm:text-xl text-lg font-semibold text-white mb-3">Unmatched Quality</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s</p>
                        </div>
                        <div className="sm:text-start text-center">
                            <Image
                                src={Customization}
                                alt="Customization Options"
                                width={80}
                                height={80}
                                className="mb-5 sm:mx-0 mx-auto"
                            />
                            <h4 className="sm:text-xl text-lg font-semibold text-white mb-3">Customization Options</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}