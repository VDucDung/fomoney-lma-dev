import { GameContext } from "@/context/game-context";
import styles from "@/styles/splash.module.css";
import { useContext } from "react";
import { submitScore } from "@/services/submitGame";
import { useAuth } from "@/hooks/use-auth";
import { useUser, useUserStore } from "@/store/user";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useSetAllowPlay } from "@/store/game";
import { AuthProvider } from "@prisma/client";

export default function Splash({ heading = "You won!", type = "" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const { startGame } = useContext(GameContext);
  const { score } = useContext(GameContext);
  useAuth();
  const accessToken = useUserStore.getState().accessToken;
  const setAllowPlay = useSetAllowPlay();
  const user = useUser();

  const handleSubmit = async () => {
    setSubmitFailed(false);
    setIsLoading(true);
    const status = await submitScore(accessToken, score, user?.season ?? "");
    if (status == 200) {
      setIsLoading(false);
      setSubmitSuccess(true);
    } else {
      setIsLoading(false);
      setSubmitFailed(true);
    }
    if (user?.provider === AuthProvider.solana) {
      setAllowPlay(false);
    }
  };

  const handleLoading = () => {
    setIsLoading(false);
  };

  const handleNewGame = () => {
    setSubmitSuccess(false);
    startGame();
  };

  const closeSucceed = () => {
    // setSubmitSuccess(false);
  };

  const closeFailed = () => {
    // setSubmitSuccess(false);
  };

  return (
    <div className={`${styles.splash} ${type === "won" && styles.win}`}>
      <div>
        <h1>{heading}</h1>
        <div className="buttons">
          <Dialog open={isLoading} onOpenChange={handleLoading}>
            <DialogContent className={styles.loading_content}>
              <div className={styles.loading_text}>Loading...</div>
            </DialogContent>
          </Dialog>
          <Dialog open={submitSuccess} onOpenChange={closeSucceed}>
            <DialogContent className={styles.submit_pop}>
              <DialogHeader>
                <DialogTitle>Congrats!</DialogTitle>
                <DialogDescription className={styles.submit_success}>
                  Submit succeeded!
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <button
                  className={styles.button_NewGame}
                  onClick={handleNewGame}
                >
                  New Game
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={submitFailed} onOpenChange={closeFailed}>
            <DialogContent className={styles.submit_pop}>
              <DialogHeader>
                <DialogTitle>Submit Failed</DialogTitle>
                <DialogDescription className={styles.submit_success}>
                  Please try again
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <button
                  className={styles.button_NewGame}
                  onClick={handleSubmit}
                >
                  Submit Score
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button
            className={styles.button}
            onClick={startGame}
            onTouchStart={startGame}
          >
            Play again
          </button>
          <button
            className={styles.button}
            onClick={handleSubmit}
            onTouchStart={handleSubmit}
          >
            Submit Score
          </button>
        </div>
      </div>
    </div>
  );
}
