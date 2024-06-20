import os


def renomear_imagens(diretorio, padrao):
    # Lista todos os arquivos no diretório especificado
    arquivos = os.listdir(diretorio)
    # Filtra apenas os arquivos de imagem (você pode adicionar mais extensões se necessário)
    extensoes_imagens = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')
    imagens = [arquivo for arquivo in arquivos if arquivo.lower().endswith(extensoes_imagens)]

    # Renomeia cada imagem
    for i, imagem in enumerate(imagens):
        extensao = os.path.splitext(imagem)[1]
        novo_nome = f"{padrao}{i + 1}{extensao}"
        caminho_antigo = os.path.join(diretorio, imagem)
        caminho_novo = os.path.join(diretorio, novo_nome)
        os.rename(caminho_antigo, caminho_novo)
        print(f"Renomeado: {caminho_antigo} -> {caminho_novo}")


# Exemplo de uso
diretorio = 'C:/Users/robsonferreira/Documents/Materiais/Curso-JAVA/Projetos/LP SERVICES/LP SERVICES/img/portfolio'  # Substitua pelo caminho do seu diretório
padrao = 'LP'  # Padrão desejado
renomear_imagens(diretorio, padrao)
