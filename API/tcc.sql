 -- Criando o banco de dados
CREATE DATABASE Desaparecidos;

-- Usar o banco
use Desaparecidos;

DELIMITER //
CREATE PROCEDURE SelecionarPosts (userID INT)
BEGIN 
	select * from Posts WHERE UsuarioID = userID;
END// 
DELIMITER ;

 -- Criando tabelas
CREATE TABLE Usuarios(
	UsuarioID int NOT NULL AUTO_INCREMENT,
    Nome varchar(50) NOT NULL,
    Sobre_nome varchar(50) NOT NULL,
    Email varchar(100) NOT NULL,
    Senha CHAR(128) NOT NULL,
    Criado_aos datetime NOT NULL, 
    PRIMARY KEY (UsuarioID)
);

CREATE TABLE Posts(
	PostID int NOT NULL AUTO_INCREMENT,
    Titulo varchar(50) NOT NULL,
    Descricao text NOT NULL,
    Visto_encontrado varchar(100),
    Telefone varchar(20), 
    Email varchar(100),  
    Imagem1 varchar(255), 
    Imagem2 varchar(255),  
    Imagem3 varchar(255), 
    Criado_aos datetime NOT NULL,
    UsuarioID int,
    PRIMARY KEY (PostID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

CALL SelecionarPosts(1);

select C.ComentarioID, P.PostID, U.Nome as Nome_Usuario, U.Sobre_nome, C.Comentario FROM Comentarios C
INNER JOIN Usuarios U ON C.UsuarioID = U.UsuarioID
INNER JOIN Posts P ON C.PostID = P.PostID where P.PostID = 2;

CREATE TABLE Comentarios(
	ComentarioID int NOT NULL AUTO_INCREMENT,
    Comentario text,
    PostID int NOT NULL,
    UsuarioID int NOT NULL,
    Criado_aos datetime NOT NULL,
    PRIMARY KEY (ComentarioID),
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

select C.ComentarioID, P.PostID, U.Nome as Nome_Usuario, U.Sobre_nome, C.Comentario FROM Comentarios C
INNER JOIN Usuarios U ON C.UsuarioID = U.UsuarioID
INNER JOIN Posts P ON C.PostID = P.PostID;


-- Inserir dados na tabela comentarios
insert into Comentarios(Comentario, PostID, UsuarioID, Criado_aos) 
				values ('Estou comovida com essa historia, vou compartilhar', 1, 1, CURDATE());
insert into Comentarios(Comentario, PostID, UsuarioID, Criado_aos) 
				values ('Ja vi uma historia parecida', 1, 1, CURDATE());      
insert into Comentarios(Comentario, PostID, UsuarioID, Criado_aos) 
				values ('Se alguem poder ajudar', 2, 3, CURDATE());
insert into Comentarios(Comentario, PostID, UsuarioID, Criado_aos) 
				values ('Vamos ajudar', 2, 3, CURDATE());    
insert into Comentarios(Comentario, PostID, UsuarioID, Criado_aos) 
				values ('Estou compartilhando', 1, 6, CURDATE());
insert into Comentarios(Comentario, PostID, UsuarioID, Criado_aos) 
				values ('Compartilhando tambem com os meus amigos, espero que se resolva logo', 1, 5, CURDATE());      
insert into Comentarios(Comentario, PostID, UsuarioID, Criado_aos) 
				values ('CAchei interessante', 1, 5, CURDATE());                   

select * from Comentarios;
-- Inserir dados na tabela Usuarios
insert into Usuarios(Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Ana','Saldanha','anas@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Jose','Marcelo','josemarcelo@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Joana','Santos','joana@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Vitor','Neto','vitor@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Debora','Cristina','debora@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Miriam','Semedo','mirsem@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Steffani','Leticia','stefcris@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Anacleto','Home','anaclet@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Viviane','Barbosa','vivibar@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Anderson','Batista','ander@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Tulio','Antunes','tulio@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Miriam','Martines','miriammart@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Getulio','Vargas','getuliov@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Dom','Pedrom','dompedro@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Isabel','santos','isa@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Antenor','Bolini','bolini@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Vuvuzela','Vix','vuvuvix@email.com', '123senha', CURDATE());
insert into Usuarios (Nome, Sobre_nome, Email, Senha, Criado_aos) 
	values ('Ana','Tembo','temboana@email.com', '123senha', CURDATE());



-- Fazendo uma Query com as duas tabelas
SELECT Usuarios.UsuarioID as Usuario, Posts.Titulo, Posts.Descricao, Posts.Imagem1, Posts.Imagem2, 
Posts.Imagem3 FROM Posts INNER JOIN Usuarios ON Usuarios.UsuarioID = Posts.UsuarioID;

-- TRAZER ALGUNS DADOS DAS TABELAS Usuario e Posts
select U.UsuarioID, U.Nome, U.Email, U.Sobre_nome, P.PostID, P.Titulo, P.Descricao, P.Imagem1 
FROM Posts P INNER JOIN Usuarios U ON U.UsuarioID = P.UsuarioID where P.UsuarioID = 3;


select * from Posts;
select * from Usuarios;

-- Inserir dados da tabela
INSERT INTO Posts (Titulo, Descricao, Visto_encontrado, Telefone, Email, Imagem1, Imagem2, Imagem3, Criado_aos, UsuarioID)
VALUES ('Desaparecido', 'Amadeu Saldanha  desapareceu no dia 03/12/2011 na cidade de Fortaleza/CE foi visto pela ultima 
vez na praia da preguiça salvador Bahia', 'Praia da preguiça salvador Bahia', '11111111111','','/caminho/photo1.jpg',
'/caminho/photo2.jpg','/caminho/photo3.jpg', CURDATE(), 1 );

INSERT INTO Posts (Titulo, Descricao, Visto_encontrado, Telefone, Email, Imagem1, Imagem2, Imagem3, Criado_aos, UsuarioID)
VALUES ('Homem Desaparecido', 'Otalicio Ferreira desapareceu no dia 25/01/2011
', 'Nova Frio Burgo Rio de Janeiro', 'Nova Frio Burgo Rio de Janeiro', '11111111111','email@email.com','/caminho/photo1.jpg',
'/caminho/photo2.jpg','/caminho/photo3.jpg', CURDATE(), 2 );

INSERT INTO Posts (Titulo, Descricao, Visto_encontrado, Telefone, Email, Imagem1, Imagem2, Imagem3, Criado_aos, UsuarioID)
VALUES ('Homem Desaparecido', 'Joilson Férreira de Oliveira desapareceu em 01/08/2018, 
Saiu pra trabalhar mais não voltou, nem chegou no serviço, na cidade São Paulo, bairro Vila Medeiros.', 
'Vila Medeiros - São Paulo', '11111111111','email@email.com','/caminho/photo1.jpg',
'/caminho/photo2.jpg','/caminho/photo3.jpg', CURDATE(), 3 );

INSERT INTO Posts (Titulo, Descricao, Visto_encontrado, Telefone, Email, Imagem1, Imagem2, Imagem3, Criado_aos, UsuarioID)
VALUES ('Desaparecido', 'Enzo Souza Costa 11 anos fugiu de casa sexta-feira 
20/07/2018 por volta das 15hs visto por ultimo em Vista Alegre - SG', 
'Vista Alegre - SG', '11111111111','email@email.com','/caminho/photo1.jpg',
'/caminho/photo2.jpg','/caminho/photo3.jpg', CURDATE(), 4 );

INSERT INTO Posts (Titulo, Descricao, Visto_encontrado, Telefone, Email, Imagem1, Imagem2, Imagem3, Criado_aos, UsuarioID)
VALUES ('Desaparecido', 'Enzo Souza Costa 11 anos fugiu de casa sexta-feira 
20/07/2018 por volta das 15hs visto por ultimo em Vista Alegre - SG', 
'Vista Alegre - SG', '11111111111','email@email.com','/caminho/photo1.jpg',
'/caminho/photo2.jpg','/caminho/photo3.jpg', CURDATE(), 1 );

INSERT INTO Posts (Titulo, Descricao, Visto_encontrado, Telefone, Email, Imagem1, Imagem2, Imagem3, Criado_aos, UsuarioID)
VALUES ('Desaparecida', 'De acordo com familiares, foi o pai quem deixou 
Mirella no local, onde trabalha como monitora. Ela, no entanto, não chegou a entrar na faculdade. No momento do 
desaparecimento ela vestia um casaco cinza do curso, uma calça escura, uma bolsa preta e usava um lenço lilás no cabelo.', 
'Rua Fernando de Noronha', '11111111111','email@email.com','/caminho/photo1.jpg',
'/caminho/photo2.jpg','/caminho/photo3.jpg', CURDATE(), 5 );

INSERT INTO Posts (Titulo, Descricao, Visto_encontrado, Telefone, Email, Imagem1, Imagem2, Imagem3, Criado_aos, UsuarioID)
VALUES ('Desaparecida', '57 anos, 1.54m de altura, cor branca, cebelos curtos grisalhos, apresenta vitaligo nas mãos e nos pés. 
Desapareceu no dia 30/06/2017 quando saiu de casa pela manha no bairro
Vera Caçapava/SP, tRAJANDO UMA bLUSA AZUL mARINHO E lEGGING preta desde entao mais retornou.', 
'Rua Arnaldo Cunha', '11111111111','email@email.com','/caminho/photo1.jpg',
'/caminho/photo2.jpg','/caminho/photo3.jpg', CURDATE(), 6 );

INSERT INTO Posts (Titulo, Descricao, Visto_encontrado, Telefone, Email, Imagem1, Imagem2, Imagem3, Criado_aos, UsuarioID)
VALUES ('Desaparecida', 'Jeferson desapareceu dia 3 de Março de 2017.', 
'Bairro Pinheiros - SP', '11111111111','email@email.com','/caminho/photo1.jpg',
'/caminho/photo2.jpg','/caminho/photo3.jpg', CURDATE(), 7 );


INSERT INTO Posts (Titulo, Descricao, Visto_encontrado, Telefone, Email, Imagem1, Imagem2, Imagem3, Criado_aos, UsuarioID)
VALUES ('Desaparecida', 'Ingrid Vitoria Mendonça Melo desapareceu no dia 
31/07/2018 na cidade de Belo Horizonte-MG.', 
'Praia de Copa Cabana - Rio de Janeiro', '11111111111','email@email.com','/caminho/photo1.jpg',
'/caminho/photo2.jpg','/caminho/photo3.jpg', CURDATE(), 8 );



