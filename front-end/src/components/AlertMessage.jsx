import React from "react";

// tipo: "danger" (erro), "success" (sucesso), "info", etc (classes do Bootstrap)
function AlertMessage({ tipo = "danger", mensagem }) {
  if (!mensagem) return null;

  return (
    <div className={`alert alert-${tipo}`} role="alert">
      {mensagem}
    </div>
  );
}

export default AlertMessage;
