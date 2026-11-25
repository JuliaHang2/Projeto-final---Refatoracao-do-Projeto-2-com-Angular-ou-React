export default function Aviso({ mensagem }) {
  return (
    <p className="aviso" role="alert">
      {mensagem}
    </p>
  );
}
