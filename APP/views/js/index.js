function except() {
    const obj = {
      nome: document.getElementById("nome").value,
      aluno: document.getElementById("sobrenome").value,
      telefone: document.getElementById("telefone").value,
      email: document.getElementById("email").value,
    };
    fetch(`http://localhost:3000/people`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        alert("saveing sucess");
      })
      .catch((error) => alert(error.message));
  }
  //sicronizar, function  for update and create database
  function sync() {
    const sinc = async (request, response) => {
      await salvar.sync();
      response.status(200).send("database upgrdae!");
    };
    fetch(`http://localhost:3030//people/:email`, {
      body: JSON.stringify(sinc),
    })
      .then((res) => {
        alert("people async");
      })
      .catch((error) => alert(error.message));
  }