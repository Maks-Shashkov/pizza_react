import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <div className='pizza-block-wrapper'>
        <ContentLoader
            className='pizza-block'
            speed={2}
            width={280}
            height={500}
            viewBox="0 0 280 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="134" cy="136" r="125" />
            <rect x="-1" y="293" rx="10" ry="10" width="280" height="28" />
            <rect x="0" y="337" rx="10" ry="10" width="280" height="88" />
            <rect x="0" y="448" rx="10" ry="10" width="95" height="30" />
            <rect x="127" y="441" rx="20" ry="20" width="152" height="45" />
        </ContentLoader>
    </div>
)

export default Skeleton

