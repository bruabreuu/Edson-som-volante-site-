# Edson Som Volante - Landing Page

Landing page estática pronta para deploy no Cloudflare Pages.

## Arquivos principais

- `index.html`: página principal
- `styles.css`: estilos fonte/editáveis
- `styles.min.css`: estilos minificados usados pela página
- `script.js`: animações, formulário e eventos para GTM
- `robots.txt`: instruções para buscadores
- `sitemap.xml`: mapa do site
- `manifest.webmanifest`: manifesto web/app
- `_headers`: cabeçalhos de segurança e cache para Cloudflare Pages
- `assets/`: imagens, vídeo, fonte e ícones

## Antes de publicar, substitua estes placeholders

No arquivo `index.html`:

- `GTM-XXXXXXX`: substitua pelo ID real do Google Tag Manager
- `https://edsonsomvolante.com.br/`: domínio final configurado na landing page
- `https://edsonsomvolante.com.br/assets/edson-social-frota.jpg`: imagem social configurada com o domínio final

No Google Tag Manager:

- `G-XXXXXXXXXX`: adicione o Measurement ID real do Google Analytics 4 em uma tag GA4
- `000000000000000`: adicione o ID real do Meta Pixel em uma tag do Meta Pixel
- Configure GA4 e Meta Pixel para dispararem nas páginas e nos eventos da landing

No arquivo `robots.txt`:

- `https://edsonsomvolante.com.br/sitemap.xml`: sitemap configurado com o domínio final

No arquivo `sitemap.xml`:

- `https://edsonsomvolante.com.br/`: domínio final configurado no sitemap

## Google Tag Manager, GA4 e Meta Pixel

A landing já possui o container do Google Tag Manager com o placeholder `GTM-XXXXXXX`.

Crie/configure dentro do GTM:

- Google Analytics 4: tag de configuração com o Measurement ID do GA4
- Meta Pixel: tag HTML personalizada ou template oficial do Pixel
- Acionadores com os eventos abaixo

Eventos enviados para o `dataLayer`:

- `whatsapp_click`: cliques em botões/links de WhatsApp
- `quote_click`: cliques em botões de orçamento
- `quote_submit`: envio do formulário de orçamento

Parâmetros enviados:

- `event_category`: `Landing Page`
- `event_label`: identificação do botão clicado

## Publicar no Cloudflare Pages

1. Entre no Cloudflare Pages
2. Crie um novo projeto
3. Envie/conecte a pasta `outputs`
4. Configure como site estático, sem comando de build
5. Build command: deixe vazio
6. Output directory: `/` se fizer upload direto da pasta `outputs`, ou `outputs` se publicar pelo repositório raiz
7. Publique
8. Depois do deploy, troque todos os placeholders pelo domínio final e pelo ID real do GTM

## Observações de produção

- As imagens fora da primeira dobra usam `loading="lazy"`
- A fonte principal é carregada com `preload`
- O hero usa preload da imagem principal
- O CSS foi minificado em `styles.min.css`
- O JavaScript foi mantido legível para evitar quebra de eventos sem um minificador dedicado
- O sitemap e os metadados usam o domínio final `https://edsonsomvolante.com.br`
- O Cloudflare faz compressão automática de arquivos estáticos quando habilitado no painel
