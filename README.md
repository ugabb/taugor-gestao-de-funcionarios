

<br />
<div align="center">

  <h3 align="center">Taugor Gerenciamento de Funcionarios</h3>

  <p align="center">
    Gabriel Silva Barros
    <br />
    <a href="https://www.linkedin.com/in/ugab/">
	    <strong>
            <img width="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" />
	     </strong>
   </a>
   <a href="https://github.com/ugabb/taugor-gestao-de-funcionarios/tree/main">
	    <strong>	
		   <img width="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
		</strong>
  </a>
    <br />
    <br />
    <a href="https://frontend-taugor-gestao-de-funcionarios.vercel.app/">Ver aplicação</a>
  </p>
</div>


## Sobre o Projeto

![taugor-site](https://github.com/ugabb/taugor-gestao-de-funcionarios/assets/76067595/50f8de82-e2af-450d-a1e8-56ac807632d8)


O projeto foi desenvolvido utilizando um conjunto de tecnologias modernas e robustas. No lado do front-end, optei por implementar a aplicação com Next.js, Tailwind CSS, React Hook Form e jsPDF.    <br />
	 Next.js proporciona uma experiência de desenvolvimento ágil e eficiente, permitindo a criação de aplicativos web rápidos e escaláveis.    <br />
	 Já o Tailwind CSS proporcionou uma abordagem eficaz para o design e estilização, facilitando a criação de interfaces responsivas de maneira mais rápida.     <br />
	A utilização do React Hook Form-form permite simplificar e aprimorar o processo de criação de formulários dinâmicos e interativos, React Hook Form oferece uma maneira eficiente e eficaz de lidar com validações complexas, manipulação de eventos e gerenciamento de estados relacionados a formulários.    <br />
		 Para a manipulação de documentos em PDF, foi implementado a biblioteca jsPDF em conjunto com o HTML2Canvas. Essa combinação permite gerar documentos em PDF e de alta qualidade a partir do conteúdo HTML e do estilo CSS da aplicação. O HTML2Canvas é utilizado para capturar o conteúdo da aplicação em formato de imagem, enquanto o jsPDF possibilita a conversão dessa imagem em um documento PDF.    <br />
		 Alem disso, no lado do back-end optei por construir a estrutura utilizando Node.js em conjunto com o framework Express.o uso do Express simplificou o processo de criação de APIs, proporcionando uma base sólida para o desenvolvimento do backend da aplicação de gestão de documentos cadastrais de funcionários.    <br />
			Para lidar com a validação de dados de forma estruturada e segura, integrei a biblioteca Zod ao projeto. A Zod oferece um conjunto de ferramentas para validar e garantir a integridade dos dados recebidos pelo backend, o que é fundamental para assegurar a consistência e a confiabilidade das informações relacionadas aos funcionários.    <br />

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Feito com:
* ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
* ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
*  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
*    [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
*  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
* [![Zod](https://img.shields.io/badge/Zod-F24C1E?style=for-the-badge&logo=zod&logoColor=white)](https://github.com/colinhacks/zod)
* [![React Hook Form](https://img.shields.io/badge/React_Hook_Form-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react-hook-form.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Passo a passo para rodar na sua máquina.

### Pré requisitos:

Faça p git clone do repositório na sua máquina. E depois vá no diretório da pasta desejada (front-end ou backend) e dê o seguinte comando:

  ```sh
  npm install
  ```

Feito isso você deve colocar as variáveis de ambiente. No front-end as variáveis são:
* NEXT_PUBLIC_API_KEY -> "https://backend-taugor-gestao-de-pessoas-6yz2xpm0d-uslv.vercel.app/api/funcionario"
* NEXT_PUBLIC_FIREBASE_API_KEY
* NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
* NEXT_PUBLIC_FIREBASE_PROJECT_ID
* NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
* NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
* NEXT_PUBLIC_FIREBASE_APP_ID
* NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

As variaveis relacionadas ao firebas você deve olhar a documentação e procurar pelo arquivo de configuração do firebase
