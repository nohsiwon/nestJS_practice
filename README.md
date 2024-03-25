# Devcamp-project

## 초기 폴더 구조 구상

📦payment</br>
 ┣ 📂controllers</br>
 ┃ ┣ 📜index.ts</br>
 ┃ ┗ 📜payment.controller.ts</br>
 ┣ 📂dto</br>
 ┃ ┗ 📜create-order.dto.ts</br>
 ┃ ┣ 📜index.ts</br>
 ┣ 📂entities</br>
 ┃ ┣ 📜coupon.entity.ts</br>
 ┃ ┣ 📜index.ts</br>
 ┃ ┣ 📜issued-coupon.entity.ts</br>
 ┃ ┣ 📜order-item.entity.ts</br>
 ┃ ┣ 📜order.entity.ts</br>
 ┃ ┣ 📜point-log.entity.ts</br>
 ┃ ┣ 📜point.entity.ts</br>
 ┃ ┣ 📜product.entity.ts</br>
 ┃ ┗ 📜shipping-info.entity.ts</br>
 ┣ 📂repositories</br>
 ┃ ┣ 📜coupon.repository.ts</br>
 ┃ ┣ 📜index.ts</br>
 ┃ ┣ 📜issued-coupon.repository.ts</br>
 ┃ ┣ 📜order-item.repository.ts</br>
 ┃ ┣ 📜order.repository.ts</br>
 ┃ ┣ 📜point-log.repository.ts</br>
 ┃ ┣ 📜point.repository.ts</br>
 ┃ ┣ 📜product.repository.ts</br>
 ┃ ┗ 📜shipping-info.repository.ts</br>
 ┣ 📂services</br>
 ┃ ┣ 📜index.ts</br>
 ┃ ┣ 📜payment.service.ts</br>
 ┃ ┗ 📜product.service.ts</br>
 ┗ 📜payment.module.ts</br>

> 예시 코드를 참조하여 구성
</br>

## 초기 코드 흐름 구상

- **주문 페이지** (바로 구매)
  - **주문 페이지 API** -> 주문 갯수에 맞춰 총 가격 반환
  </br>
  
  - **쿠폰 적용 API** -> 총 가격의 쿠폰 적용 가격 반환, 이미 포인트 사용했을 시 (총가격 - 포인트) * (쿠폰% / 100) or -쿠폰
    - 정액제 쿠폰이 총 가격을 초과할 시 사용 가능하지만 초과 할인 불가
      ex) 1000원 상품 -> 3000원 쿠폰 = 1000원 할인 -> 가격 0원
      </br>
      
  - **포인트 적용 API** -> 총 가격의 포인트 적용 가격 반환, 이미 쿠폰 사용했을 시 (총가격  * (쿠폰% / 100)) - 포인트 or 총가격 - 쿠폰 - 포인트
    - 포인트가 총 가격을 초과할 시 총 가격까지 사용 가능하도록 제한
    </br>
    
  - **구매하기 API** -> 총가격에 적용한 쿠폰, 포인트를 트렌젝션으로 묶어 처리 -> 포인트 사용한 만큼 절감, 사용한 쿠폰 제거, 결제
    - **구매 완료** 시 order 테이블에 주문내역 추가
 </br>
 </br>
 
- **장바구니 페이지** (담기 후 구매)
  - **장바구니 페이지 API** -> 주문 총 가격 반환
   </br>
   
  - **쿠폰 적용 API** -> 정액제 쿠폰 사용 시 "바로 구매" 페이지와 동일. 정률제 쿠폰 사용 시 쿠폰 적용할 상품 선택
    - 정률제 쿠폰 적용 상품 할인가 + 나머지 총 가격 합 = 최종 결제 금액
    - 포인트, 정액제 쿠폰 사용 시에는 총 가격에서 절감
   </br>
   
  - **포인트 적용 API** -> 포인트 사용 시 총 가격에서 절감
    - 포인트가 총 가격을 초과할 시 총 가격까지 사용 가능하도록 제한
   </br>
   
  - **구매 하기 API** -> 정률제 쿠폰 사용 상품 할인 후 총 가격에서 포인트, 정액제 쿠폰 절감. 트렌젝션으로 묶어 처리 -> 포인트 사용한 만큼절감, 사용한 쿠폰 제거, 결제
    - **구매 완료** 시 order 테이블에 주문내역 추가
    </br>
