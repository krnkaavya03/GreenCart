import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
    return (
        <div id="footer" className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="w-34 md:w-32" src={assets.logo} alt="logo" />
                    <p className="max-w-[410px] mt-6">
                        We deliver freshly imported groceries and snacks straight to your doorstep. Trusted by thousands, we aim to make your shopping experience simple and affordable.
                    </p>
                    <div className="max-w-[410px] mt-6" id="contact-section">
                        <h3 className="font-semibold text-gray-900">FOR QUERIES:</h3>
                        <p>Dial us - +91 97543 18790</p>
                        <p>Mail us - support@greencart.com</p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        {link.url === '#contact' ? (
                                            <a 
                                                href="#contact-section" 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById('contact-section')?.scrollIntoView({ 
                                                        behavior: 'smooth' 
                                                    });
                                                }}
                                                className="hover:underline transition"
                                            >
                                                {link.text}
                                            </a>
                                        ) : (
                                            <a href={link.url} className="hover:underline transition">{link.text}</a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                © {new Date().getFullYear()} GreenCart - All Right Reserved.
            </p>
        </div>
    );
};

export default Footer;