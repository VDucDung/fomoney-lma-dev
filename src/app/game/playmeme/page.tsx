"use client";
import Head from "next/head";
import Image from "next/image";
import Board from "@/components/game/board";
import Score from "@/components/game/score";
import styles from "@/styles/index.module.css";
import pillred from "../../../assets/images/pillred.png";
import GameProvider from "@/context/game-context";
import "@/styles/globals.css";
import "@/styles/style.css";
import { useAuth } from "@/hooks/use-auth";
import { useAllowPlay } from "@/store/game";
import { redirect } from "next/navigation";

export default function Playmeme() {
  const data = { team: "me" };
  useAuth();
  const allowPlayGame = useAllowPlay();
  if (!allowPlayGame) {
    return redirect("/game");
  }

  return (
    <GameProvider>
      <div className={styles.twenty48}>
        <Head>
          <title>Play 2048</title>
          <meta
            name="description"
            content="Fully-functional 2048 game built in NextJS and TypeScript. Including animations."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon16.png"
          />
        </Head>
        <header>
          {/* <Image className="header_logo" src={logo} alt="logo" /> */}
          {/* <Image src={pillred} className='pillred_4' alt='pillred' />
          <Score /> */}
        </header>
        <main>
          {/* <Image className="header_logo" onClick={() => { router.push(`/`) }} src={logo} alt="logo" /> */}
          <div className="play_container">
            <div className="pill_score">
              <Image src={pillred} className="pillred_4" alt="pillred" />
              <Score />
            </div>
            <Board {...data} />
          </div>
        </main>
      </div>
    </GameProvider>
  );
}
