'use client';
import { ScrollVelocity } from "./ui/ScrollVelocity/ScrollVelocity";

  
export default function Scroll() {
    return (
        <div className="relative overflow-hidden py-20">
            <div className="origin-center -rotate-2 scale-110">
                <ScrollVelocity
                    texts={['Let\'s work Together',
                        'Create Something Amazing From ideas To interfaces']}
                    velocity={100}
                    className="custom-scroll-text"
                    numCopies={6}
                    damping={50}
                    stiffness={400}
                />
            </div>
        </div>
    )
}