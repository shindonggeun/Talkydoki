import { useModalContent, useSetISModalOn } from "@/stores/modalStore";
import { ModalBackground, ModalCard } from "@/styles/common/ui/container";
import { Button } from "@mui/material";
import { useEffect } from "react";

function Modal() {
  const setIsModalOn = useSetISModalOn();
  const { message, onSuccess, isInfo, isReadOnly } = useModalContent();

  const preventScroll = (e: WheelEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("wheel", preventScroll, { passive: false });
    return () => window.removeEventListener("wheel", preventScroll);
  }, []);

  return (
    <>
      <ModalBackground>
        <ModalCard>
          <div className="innerText">{message}</div>
          {!isReadOnly && (
            <div className="buttons">
              {isInfo ? (
                // 정보 팝업일 경우 확인 버튼만 출력
                <Button color="purple" onClick={() => setIsModalOn(false)}>
                  확인
                </Button>
              ) : (
                // 확인 팝업일 경우 확인/취소 버튼 출력
                <>
                  <Button color="purple" onClick={() => onSuccess()}>
                    확인
                  </Button>
                  <Button color="purple" onClick={() => setIsModalOn(false)}>
                    취소
                  </Button>
                </>
              )}
            </div>
          )}
        </ModalCard>
      </ModalBackground>
    </>
  );
}

export default Modal;
