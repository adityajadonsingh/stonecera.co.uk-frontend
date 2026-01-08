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
            <section className="relative py-16">
                <Image
                    src={WhyChooseUsImage}
                    alt="why choose us"
                    fill
                    className="object-cover z-0"
                />
                <div className="container relative z-10 ">
                    <h2 className="text-center text-white text-3xl font-bold mb-10">Why Choose Us</h2>
                    <div className="grid grid-cols-3 gap-x-8 gap-y-12">
                        <div>
                            <Image
                                src={Material}
                                alt="Material Range"
                                width={80}
                                height={80}
                                className="mb-5"
                            />
                            <h4 className="text-xl font-semibold text-white mb-3">Extensive Material Range</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <div>
                            <Image
                                src={Design}
                                alt="Design"
                                width={80}
                                height={80}
                                className="mb-5"
                            />
                            <h4 className="text-xl font-semibold text-white mb-3">Unique Designs</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <div>
                            <Image
                                src={Expert}
                                alt="Expert Guidance"
                                width={80}
                                height={80}
                                className="mb-5"
                            />
                            <h4 className="text-xl font-semibold text-white mb-3">Expert Guidance</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <div>
                            <Image
                                src={Sustainable}
                                alt="Sustainable Sourcing"
                                width={80}
                                height={80}
                                className="mb-5"
                            />
                            <h4 className="text-xl font-semibold text-white mb-3">Sustainable Sourcing</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <div>
                            <Image
                                src={Unmatched}
                                alt="Unmatched Quality"
                                width={56}
                                height={70}
                                className="mb-5"
                            />
                            <h4 className="text-xl font-semibold text-white mb-3">Unmatched Quality</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <div>
                            <Image
                                src={Customization}
                                alt="Customization Options"
                                width={80}
                                height={80}
                                className="mb-5"
                            />
                            <h4 className="text-xl font-semibold text-white mb-3">Customization Options</h4>
                            <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}