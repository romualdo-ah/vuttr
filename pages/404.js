import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const [counter, setCounter] = useState("");

  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/home");
    }, 3000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setCounter(counter+".");
    }, 1000);
  }, [counter]);
  return (
    <div style={{display:"flex"}} className={styles.container}>
      <p className={styles.custom404}>404</p>
      <h2 className={styles.Hero_title}>Page not found</h2>
      <h2 >
        Redirecting to{" "}
        <Link href="/home">
          <a>homepage</a>
        </Link>{" "}
        
      </h2>
      <h3>in{counter}</h3> 

      <style jsx>{`
        
        div{
          display:flex;
          justify-Content:center;
        }
        h2{
        z-index:2;
        text-align: center;
        }
        .Hero_Title{
          text-align:center;
        }
      `}</style>
    </div>
  );
}
