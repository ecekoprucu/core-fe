import { Container } from "react-bootstrap";

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
    role: string;
    text: string;
}

export const AlertComponent = ({show, setShow, role, text}: Props) => {
    return (
            <Container className={`w-25 p-3 container-sm justify-content-center alert alert-${role} d-flex align-items-center`} role={role}>
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
                <div>
                    {text}
                </div>
            </Container>
    )
}