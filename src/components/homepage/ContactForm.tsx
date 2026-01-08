import Image from "next/image";
import ContactImg from "../../../public/media/contactForm.jpg";
export default function ContactForm() {
    return(
        <>
            <section className="contact-form py-16">
                <div className="container">
                    <div className="grid bg-skin rounded-md grid-cols-2">
                        <div className="p-10">
                            <h2 className="heading mb-3 text-3xl font-bold">Get In Touch</h2>
                            <p className="mb-5">We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.</p>
                            <form action="">
                                <div className="w-full">
                                    <input type="text" name="name" placeholder="Your Name" className="w-full p-3 bg-white rounded-md mb-4" />
                                </div>
                                <div className="w-full">
                                    <input type="email" name="email" placeholder="Your Email" className="w-full p-3 bg-white rounded-md mb-4" />
                                </div>
                                <div className="w-full">
                                    <input type="tel" name="phone" placeholder="Your Phone Number" className="w-full p-3 bg-white rounded-md mb-4" />
                                </div>
                                <div className="w-full">
                                    <textarea name="message" placeholder="Your Message" rows={5} className="w-full p-3 bg-white rounded-md mb-4" />
                                </div>
                                <div className="w-full">
                                    <button className="button-logo-1 py-2 px-4 rounded-md cursor-pointer">Send Message</button>
                                </div>
                            </form>
                        </div>
                        <div className="relative">
                            <Image src={ContactImg} alt="Contact Us" fill className="object-cover rounded-r-md" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}