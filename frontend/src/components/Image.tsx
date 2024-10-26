import { LazyLoadImage } from 'react-lazy-load-image-component'

type Props={

    src:string,
    className:string
}

const Image = (props:Props) => {
  return (
    <div>
       <LazyLoadImage src={props.src} className={props.className || ""} />
    </div>
  )
}

export default Image
