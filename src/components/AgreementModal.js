import Modal from 'react-modal';
import './AgreementModal.css';


function AgreementModal(props){
    const customStyles = {
        overlay: {
            zIndex: 1000,
            backgroundColor: '#00000070',
        },
        content: {
            width: '800px',
            inset: 'unset',
            margin: '50vh auto',
            padding: 0,
            transform: 'translateY(-50%)',
            position: 'relative'
        }
    };

    return(
        <Modal isOpen={props.isOpen} style={customStyles}>
            <div className='modal-wrapper'>
                <h3 className='title'>{props.data.title}</h3>
                <div className='content'>
                    <p>{props.data.content}</p>
                    <button className='close-btn' onClick={event => props.closeModal()}>닫기</button>
                </div>
            </div>
        </Modal>
    )
}
export default AgreementModal;