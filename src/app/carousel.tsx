// 'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Carousel() {
    const contents: string[] = [
        '현재 국내에서 운영중인\n태양광 발전소\n총 163,636개소',
        '태양광 발전은\n패널에 쌓인 오염물질로 인해\n발전 효율\n최대 50%까지 감소',
        '주기적 유지 보수를 위해서는\n상당한 비용이 발생',
        '태양광 발전 시스템 규모 상 인력으로 오염을\n모두 제거하기에도\n한계 존재',
        '[solAR cleAR] 은 Object Detection 기반\n오염 탐지 시스템을 통해\n태양광 패널 실시간 모니터링 기능을 제공합니다'
    ];

    return (
        <div>
              <Swiper
                  className="h-[500px] custom-swiper transition-all duration-500 ease-in-out"
                  speed={1000}
                  spaceBetween={0}                  // 슬라이드 간의 간격
                  slidesPerView={2}                 // 한 번에 보여줄 슬라이드 수
                  centeredSlides={true}             // 카드 중앙 정렬
                  navigation={ true }                 // 이전/다음 버튼 추가
                  pagination={{ clickable: true }}  // 페이지네이션(페이지 번호) 표시
                  effect="coverflow"
                  coverflowEffect={{
                    rotate: 0,
                    stretch: -100,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
                  style={{
                    transitionTimingFunction: "ease-in-out", // Easing 함수 추가
                  }}
                  autoplay={{
                  delay: 3000, // 3초마다 자동으로 슬라이드 전환
                  disableOnInteraction: false, // 사용자가 슬라이드를 클릭해도 자동 전환 계속 유지
                  }}
              >
                  {/* 5개의 카드 슬라이드 추가 */}
                  {contents.map((item, index) => (
                  <SwiperSlide key={index}>
                      <div className="flex justify-center items-center bg-white opacity-60 h-full text-deep-green rounded-3xl">
                      <h3 className="text-center text-5xl font-extrabold p-10 whitespace-pre-line leading-relaxed">{item}</h3>
                      </div>
                  </SwiperSlide>
                  ))}
              </Swiper>
          </div>
    )
}