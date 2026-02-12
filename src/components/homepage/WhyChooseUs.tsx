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
                                className="mb-3 sm:mx-0 mx-auto"
                            />
                            <h4 className="sm:text-xl text-lg font-semibold text-white mb-3">Extensive Material Range</h4>
                            <p className="text-white">We offer a wide selection of natural stone and porcelain products, including limestone, sandstone, slate, cobblestones, wall cladding, and outdoor porcelain tiles. Our range is carefully curated to suit both modern and traditional spaces.</p>
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
                            <p className="text-white">Each Stonecera product is chosen for its distinctive texture, colour, and finish. From timeless natural stone to contemporary porcelain slabs, our collections help create spaces that stand out with character and style.</p>
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
                            <p className="text-white">Our experienced team provides honest advice to help you choose the right material for your project. Whether it's a patio, driveway, wall cladding, or interior space, we guide you at every step with practical product knowledge.</p>
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
                            <p className="text-white">We work with trusted quarries and manufacturers that follow responsible sourcing practices. Our focus is on durability, ethical sourcing, and materials designed to last for years with minimal environmental impact.</p>
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
                            <p className="text-white">Quality is at the heart of Stonecera. Every product is selected to meet high standards of strength, finish, and performance, ensuring long-lasting results for residential and commercial projects.</p>
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
                            <p className="text-white">Choose from multiple sizes, finishes, colours, and textures to match your design vision. Our versatile product options make it easy to tailor stone and porcelain solutions to your exact project requirements.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}