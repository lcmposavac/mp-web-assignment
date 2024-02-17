export const ProfileCard = () => {
  return (
    <figure className="mx-auto mt-12 max-w-2xl overflow-hidden">
      <img className="md:h-auto object-cover" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Thomas_Edison2.jpg/800px-Thomas_Edison2.jpg" alt="" width="200" height="246" />
      <div className="">
        <blockquote>
          <p className="">
            “Thomas Alva Edison (February 11, 1847 – October 18, 1931) was an American inventor and businessman.[1][2][3] He developed many devices in fields such as electric power generation, mass communication, sound recording, and motion pictures.[4] These inventions, which include the phonograph, the motion picture camera, and early versions of the electric light bulb, have had a widespread impact on the modern industrialized world.”
          </p>
        </blockquote>
        <figcaption className="">
          <div className="">
            Thomas Edison
          </div>
          <div className="">
            Creator, Light Bulb
          </div>
        </figcaption>
      </div>
    </figure>
  )
}


