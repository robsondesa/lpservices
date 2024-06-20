<?php
  //Variáveis
  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $telefone = $_POST['telefone'];
  $telefone_internacional = '+' . preg_replace('/[^0-9]/', '', str_replace('-', '', $telefone));
  $mensagem = $_POST['mensagem'];
  $data_envio = date('d/m/Y');
  $hora_envio = date('H:i:s');
  //Compo E-mail
  $arquivo = "
    Nome: $nome
    E-mail: $email
    Contato: $telefone_internacional
    
    Mensagem:
    $mensagem
    
    
    
    Esta mensagem foi enviada em $data_envio as $hora_envio.
    Este e-mail foi enviado pelo formulário de contato do site.

  ";


  //Emails para quem será enviado o formulário
  $destino = "robsonsa201499@gmail.com";
  $assunto = "Contato para LP SERVICES";

  //Este sempre deverá existir para garantir a exibição correta dos caracteres
  $headers  = "MIME-Version: 1.0\n";
  $headers .= "Content-type: text/html; charset=iso-8859-1\n";
  $headers .= "From: $nome <$email>";

  // Enviar
  if(mail($destino, $assunto, $arquivo, $headers)){ 
    echo 'Sua mensagem foi enviada com sucesso!'; 
  }else{ 
    echo 'O envio falhou. Tente novamente mais tarde.'; 
  }

  echo "<meta http-equiv='refresh' content='3;URL=contact.html'>";
?>