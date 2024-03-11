import { useModalContent, useSetISModalOn } from "@/stores/modalStore";
import { ModalBackground, ModalCard } from "@/styles/ui/container";
import { Button } from "@mui/material";

function Modal() {
  const setIsModalOn = useSetISModalOn();
  const { message, onSuccess, isInfo } = useModalContent();

  return (
    <>
      <ModalBackground>
        <ModalCard>
          <div className="innerText">{message}</div>
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
        </ModalCard>
      </ModalBackground>
    </>
  );
}

export default Modal;
