### 태양광 패널 오염 감지 시스템

**SDGs #7 : Affordable and Clean Energy**

### 1. 기술 스택 

![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)  ![TailwindCss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)  ![AWS SDK](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
---
### 2. UI
#### 2-1. 모니터링 및 이미지 분석 페이지
<img width="200px" src="https://github.com/user-attachments/assets/3aa3f7d4-8241-481c-9fa3-5a5b89642168"/>

#### 2-2. 분석 결과 확인 페이지
<img width="200px" src="https://github.com/user-attachments/assets/6dfa3dd5-ac43-4bde-9ae0-c5403ac8a1bc"/>


---
### 3. API 명세서
#### `/api/detect`

| **HTTP 메서드** | **POST** |
|-----------------|----------|
| **목적** | 이미지 분석 후 태양광 패널 탐지 결과 저장 |
| **요청 파라미터** | `imageFile` (File): 분석할 이미지 (필수)<br> `confidence` (String): 신뢰도 임계값 (선택)<br> `nmsThreshold` (String): NMS 임계값 (선택) |
| **응답 필드** | `message` (String): 성공/실패 메시지<br> `detections` (Array): 탐지된 객체 리스트 (label, confidence, coordinates)<br> `s3Url` (String): 처리된 이미지 URL (S3) |

---

#### `/api/detect`

| **HTTP 메서드** | **GET** |
|-----------------|---------|
| **목적** | 저장된 이미지 탐지 결과 조회 (날짜 범위 필터링) |
| **요청 파라미터** | `startDate` (String): 시작 날짜 (선택)<br> `endDate` (String): 종료 날짜 (선택) |
| **응답 필드** | `detections` (Array): 탐지된 결과 리스트<br> `message` (String): 성공/실패 메시지 |

---

#### `/api/upload`

| **HTTP 메서드** | **POST** |
|-----------------|----------|
| **목적** | Base64 인코딩된 이미지 S3 업로드 |
| **요청 파라미터** | `file` (String): Base64로 인코딩된 이미지 (필수) |
| **응답 필드** | `message` (String): 성공/실패 메시지<br> `fileUrl` (String): 업로드된 이미지 URL (S3) |

---

### 4. 핵심 기능 

#### 4-1. 공통
AI 서버로 가는 통신 비용을 감소하기 위해서 Next.js를 통해서 클라이언트와 서버를 한번에 구성했습니다. 해당 서비스의 특성상, 다수의 사람이 이를 사용하는 것이 아니라 각 태양광 패널을 소유한 기업이나 관리자가 이를 관제하는 것이 목적이기 때문에, 통신 비용을 최소화하는 것이 매우 중요합니다.

#### 4-2. 서버 사이드
- **S3 버킷에 이미지 데이터 저장**: 사용자가 업로드한 태양광 패널의 사진을 안전하게 저장하고 관리할 수 있습니다. S3의 확장성과 안정성을 활용하여 데이터의 손실 없이 장기적으로 관리 가능합니다.
- **Prisma를 통한 데이터 영구 저장**: AI 서버에서 분석된 결과는 실시간으로 사용자에게 제공되어, 패널의 상태(오염 및 균열)를 정확하게 알려줍니다. Prisma ORM을 사용하여 데이터베이스와의 원활한 통신을 지원합니다.

#### 4-3. 클라이언트 사이드
- **카메라로 송출되는 화면 분석**: 실시간으로 카메라 화면을 프레임 단위로 분석하여 일정 시간마다 패널 상태를 자동으로 확인합니다. AI 모델을 활용하여 패널의 오염 및 균열을 빠르고 정확하게 식별합니다.
- **이미지 업로드를 통한 분석**: 사용자가 직접 이미지를 업로드하여 태양광 패널의 오염 및 손상 정도를 빠르게 확인할 수 있습니다. 이미지 분석 후, 오염이나 균열 여부를 상세히 보고합니다.

---

### 5. 배포
해당 서버는 Vercel 을 통해서 Server와 Client 가 통합 배포되었으며, 이를 통해서 별다른 백엔드 서버 없이 AI와의 통신을 가능하게 합니다.
