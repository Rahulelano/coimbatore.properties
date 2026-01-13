import Header from "@/components/Header";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const TestimonialsPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="pt-20">
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
};

export default TestimonialsPage;
