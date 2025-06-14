# 댓글 기능이 있는 익명 게시판 및 키워드 알림 프로젝트

## 목차
- [프로젝트 개요](#프로젝트-개요)
- [기능](#기능)
- [기술 스택](#기술-스택)
- [설치](#설치)
- [API 문서](#API-문서)
- [데이터베이스 스키마](#데이터베이스-스키마)

## 프로젝트 개요

사용자들이 게시물을 작성하고, 댓글을 달며, 키워드 알림을 설정할 수 있는 RESTful API 서버입니다.  

## 기능

- **게시물**: 게시물 조회, 생성, 수정, 삭제
- **댓글**: 댓글 조회, 생성(대댓글 생성 포함)
- **키워드 알림**: 게시물, 댓글이 생성되었을 때 알림
- **Swagger 문서화**: 간단한 API 문서 및 테스트 가능

## 기술 스택
- **백엔드**: NestJS, TypeORM
- **데이터베이스**: MySQL
- **언어**: TypeScript
- **기타**: docker

## 설치

### 사전 요구사항

- Node.js: v18 이상 (v20 LTS 권장)
- Yarn: v1.x 
- MySQL: v8.0 이상
- 환경 변수: .env 파일 설정
  ```
  # env example
  DB_URL=mysql://board_user:board_pass@localhost:3306/board_db
  PORT=3000
  ```
  - root에서 `.env` 파일 생성하여 넣기

### 설치

1. 레포지토리 클론
    ```
    git clone https://github.com/your-username/anonymous-board-api.git
    cd anonymous-board-api
    ```
2.  종속성 설치
    ```
    yarn
    ```
3. 환경 변수 설정: 프로젝트 루트에 `.env` 파일 생성
    ```
    # .env
    DB_URL=mysql://board_user:board_pass@localhost:3306/board_db
    PORT=3000
    ```

4. MySQL 설정
    - docker-compose.yml 확인
      ```
      version: '3.8'
      services:
        mysql:
          image: mysql:8.0
          container_name: anonymous-board-mysql
          restart: always
          environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: board_db
            MYSQL_USER: board_user
            MYSQL_PASSWORD: board_pass
          ports:
            - "3306:3306"
          volumes:
            - db_data:/var/lib/mysql
            - ./init:/docker-entrypoint-initdb.d
      
      volumes:
        db_data:
      ```
    - 초기화 스크립트 확인
      - ./init 디렉토리에 init.sql 저장 (제공된 스크립트 사용)
      - 파일 권한 확인:
        ```
        chmod 644 ./init/init.sql
        ```
    - docker 실행
      ```
      docker-compose up -d
      ```
5. 서버 실행
   ```
   yarn start:dev
   ```

## API 문서
서버 실행 후 Swagger를 통해 API 문서를 확인 및 테스트 가능:
- URL: http://localhost:3000/api-docs

## 데이터베이스 스키마
![ER Diagram](./docs/schema.png)
- 자세한 내용은 `./init/init.sql` 참조

----
⚠️ 커밋 관련 안내
평소에는 기능 단위로 커밋을 세분화하여 히스토리를 관리하지만, 이번 프로젝트는 시간 관계상 커밋을 한 번에 정리하여 푸시하게 되었습니다.
