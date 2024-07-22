<?php
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$telefone_internacional = '+' . preg_replace('/[^0-9]/', '', str_replace('-', '', $telefone));
$mensagem = $_POST['mensagem'];
$estado = $_POST['estado'];
$data_envio = date('d/m/Y');
$hora_envio = date('H:i:s');

// Definindo o boundary para o cabeçalho do e-mail
$boundary = md5(uniqid(time()));

$arquivo = "
    Nome: $nome
    E-mail: $email
    Contato: $telefone_internacional
    Estado da Vaga: $estado
    
    Mensagem:
    $mensagem
    
    Esta mensagem foi enviada em $data_envio às $hora_envio.
    Este e-mail foi enviado pelo formulário de contato do site.
";

$destinatario = "selecao@lpservices.com"; // Substitua pelo seu endereço de e-mail
$assunto = "Envio de Currículo";

$headers  = "MIME-Version: 1.0\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\n";
$headers .= "From: $nome <$email>\n";

$mensagem_email = "--$boundary\n";
$mensagem_email .= "Content-Type: text/plain; charset=\"UTF-8\"\n";
$mensagem_email .= "Content-Transfer-Encoding: 8bit\n\n";
$mensagem_email .= $arquivo . "\n\n";
$mensagem_email .= "--$boundary--\n";

if(mail($destinatario, $assunto, $mensagem_email, $headers)){
    echo 'Seu currículo foi enviado com sucesso!';
} else {
    echo 'O envio do currículo falhou. Por favor, tente novamente mais tarde.';
}
?>
