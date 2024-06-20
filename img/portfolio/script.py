import os
import speech_recognition as sr


# Função para transcrever um arquivo de áudio
def transcrever_audio(arquivo_audio, recognizer):
    # Carregar o arquivo de áudio
    with sr.AudioFile(arquivo_audio) as source:
        audio = recognizer.record(source)  # Ler o áudio

    try:
        texto_transcrito = recognizer.recognize_google(audio,
                                                       language='pt-BR')  # Reconhecimento de fala usando Google Speech Recognition
        return texto_transcrito
    except sr.UnknownValueError:
        return "[Erro] Não foi possível entender o áudio"
    except sr.RequestError as e:
        return f"[Erro] Não foi possível acessar o serviço de reconhecimento de fala; {e}"


# Pasta onde estão os arquivos de áudio
pasta_audio = 'C:/Users/robsonferreira/Documents/Materiais/Curso-JAVA/Projetos/LP SERVICES/LP SERVICES/img/portfolio'

# Configurar o reconhecedor
recognizer = sr.Recognizer()

# Listar arquivos na pasta de áudio
for arquivo in os.listdir(pasta_audio):
    if arquivo.endswith('.wav') or arquivo.endswith('.mp3'):  # Extensões suportadas (adicionar mais se necessário)
        arquivo_audio = os.path.join(pasta_audio, arquivo)

        # Transcrever o áudio
        texto_transcrito = transcrever_audio(arquivo_audio, recognizer)

        # Criar arquivo de texto com o texto transcrito
        nome_arquivo_txt = os.path.splitext(arquivo)[0] + '.txt'
        caminho_arquivo_txt = os.path.join(pasta_audio, nome_arquivo_txt)

        with open(caminho_arquivo_txt, 'w', encoding='utf-8') as arquivo_txt:
            arquivo_txt.write(texto_transcrito)

        print(f'Arquivo {nome_arquivo_txt} criado com sucesso.')

print('Transcrição concluída.')
