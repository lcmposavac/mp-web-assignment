import { useRouter } from "next/router";
import { AnimatePresence, motion, MotionStyle } from "framer-motion";
import { createPortal } from "react-dom";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

const ClientOnlyPortal = (
  props: PropsWithChildren<{
    selector: string;
  }>
) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(props.selector);
    setMounted(true);
  }, [props.selector]);

  return mounted && ref.current
    ? createPortal(props.children, ref.current)
    : null;
};

export const Overlay = (
  props: PropsWithChildren<{
    show: boolean;
    style?: MotionStyle;
    className?: string;
    handleRouteChange: () => void;
  }>
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const windowOffset = useRef<null | number>(null);
  useEffect(() => {
    if (props.show && props.children) {
      windowOffset.current = window.scrollY;
      document.body.setAttribute(
        "style",
        `position: fixed; top: -${windowOffset.current}px; left: 0; right: 0;`
      );
    } else {
      /**
       * There are multiple modal instances rendered at any time.
       * Each instance manages it's own bodyScroll lock. If an instance
       * has locked it before, then only it can unlock body.
       * windowOffset is used to track if an instance has locked the body before
       * If it did when the show is true (the value is not null, then only it can unlock).
       * By default, each overlay has windowOffset null before any show true]
       */
      if (windowOffset.current !== null) {
        document.body.setAttribute("style", "");
        window.scrollTo(0, windowOffset.current);
        windowOffset.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);
  useEffect(() => {
    if (props.show) {
      setTimeout(() => {
        ref.current?.scroll({
          top: 0,
        });
      }, 100);
    }
  }, [props.show]);
  useEffect(() => {
    return () => {
      if (!props.show && windowOffset.current !== null) {
        document.body.setAttribute("style", "");
        window.scrollTo(0, windowOffset.current);
        windowOffset.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const handleRouteChange = () => {
      props.handleRouteChange();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("hashChangeStart", handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("hashChangeStart", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ClientOnlyPortal selector="#modal">
      <ErrorBoundary>
        <AnimatePresence>
          {props.show ? (
            <motion.div
              ref={ref}
              data-cy="overlay"
              key="overlay"
              variants={{
                visible: {
                  opacity: 1,
                  transition: { duration: "0.1" },
                },
                hidden: {
                  opacity: 0,
                  transition: { duration: "0.1" },
                },
              }}
              initial="hidden"
              exit="hidden"
              animate="visible"
              style={{
                zIndex: 10000000,
                backdropFilter: "blur(10px)",
                ...props.style,
              }}
              className={`fixed inset-0 no-scrollbar overflow-scroll bg-gray-400 bg-opacity-80 ${props.className || ""
                }`}
            >
              {props.children}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </ErrorBoundary>
    </ClientOnlyPortal>
  );
};
