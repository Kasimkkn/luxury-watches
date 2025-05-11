import React from "react";
import { Card, CardContent } from "@/components/ui/card";
const testimonials = [{
  quote: "Buying my Rolex Submariner was a seamless experience. The authentication process gave me complete confidence in my purchase.",
  author: "Vikram Singhania",
  position: "Watch Collector",
  image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200"
}, {
  quote: "I sold my vintage Omega through Luxury Watches and received a fair price with zero hassle. Their experts knew exactly how to value my timepiece.",
  author: "Priya Mehta",
  position: "Investment Banker",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
}, {
  quote: "The collection of watches here is impressive. I found rare pieces that I couldn't locate anywhere else in India.",
  author: "Rajesh Kumar",
  position: "CEO",
  image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200"
}];
const Testimonials = () => {
  return <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Trusted by watch enthusiasts and collectors across India
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Testimonials;