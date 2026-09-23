import { Modal } from './Modal'
import { certificateContent } from '../data/dialogue'

interface Props {
  open: boolean
  onClose: () => void
}

export function CertificateModal({ open, onClose }: Props) {
  const c = certificateContent
  return (
    <Modal open={open} onClose={onClose} className="certificate-modal">
      <div className="certificate">
        <p className="cert-eyebrow">🏆 {c.title}</p>
        <h2 className="cert-subtitle">{c.subtitle}</h2>
        <h1 className="cert-name">{c.name}</h1>
        <p className="cert-achievement">{c.achievement}</p>
        <p className="cert-role">{c.role}</p>
        <div className="cert-seal">🏆</div>
      </div>
      <button type="button" className="btn" onClick={onClose}>
        Close
      </button>
    </Modal>
  )
}
