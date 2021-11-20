import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {SingleTaskReview} from './SingleTaskReview'

export const TasksCarousel = ({ tasks }) => {

    return (
        <div style={{ marginLeft: '5em'}}>
            <Carousel
                infiniteLoop
            >
                {tasks.map((task, idx) => <SingleTaskReview task={task} key={idx} />)}
            </Carousel>
        </div>
    )
}