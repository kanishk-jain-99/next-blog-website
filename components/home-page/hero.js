import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/kj.png"
          alt="Image of KJ"
          width={300}
          height={300}
        />
        Image
      </div>
      <h1>Hi, I'm Kanishk</h1>
      <p>I am a Full Stack Software Engineer mostly working on Node JS</p>
    </section>
  );
}
