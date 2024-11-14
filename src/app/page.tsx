'use client'
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // 기본 스타일 로드

export default function Home() {
  const contents: string[] = [
    '현재 국내에서 운영중인 태양광 발전소 총 163,636개소',
    '태양광 발전은 패널에 쌓인 먼지, 조류 배설물, 낙엽 등의 오염물질로 인해 발전 효율 최대 50%까지 감소',
    '주기적인 유지 보수를 위해 상당한 비용이 부과 태양광 발전 시스템의 규모 상 인력으로 오염을 모두 제거하기에는 한계 존재.',
    'solAR cleAR은 Object Detection 기반의 오염 탐지 관리 시스템을 통해 태양광 패널 실시간 모니터링 기능을 제공합니다'
]

  return (
    <div className="">
      <div className="relative">
        <Image src='/solar-panels.png' alt="태양광패널" width={2880} height={1402}></Image>
        <div className="absolute transform -translate-y-3/4 w-full h-[500px] bg-[linear-gradient(to_bottom,_rgba(80,_98,_58,_0)_20%,_rgba(80,_98,_58,_1)_60%)]">
          {/* <div className="text-white-green text-[6vw] leading-[1.1] font-sans font-black transform translate-x-[15vw]">
            Solar Panel<br/>Contamination<br/>Detection System
          </div> */}
        </div>
        <div className="absolute top-[340px] text-white-green text-8xl leading-[1.1] font-sans font-black transform translate-x-[15vw]">
            Solar Panel<br/>Contamination<br/>Detection System
          </div>
      </div>

      <div className="bg-olive-green h-[2000] pr-[15vw] pl-[15vw]">
        <div className="relative top-80 absolute">
          <div className="">
              <Swiper
                  spaceBetween={10} // 슬라이드 간의 간격
                  slidesPerView={1} // 한 번에 보여줄 슬라이드 수
                  navigation // 이전/다음 버튼 추가
                  pagination={{ clickable: true }} // 페이지네이션(페이지 번호) 표시
                  loop // 무한 루프
                  className="h-[500px] w-[50vw] rounded-lg" // 높이 설정
              >
                  {/* 5개의 카드 슬라이드 추가 */}
                  {contents.map((item) => (
                  <SwiperSlide key={item}>
                      <div className="flex justify-center items-center bg-white opacity-60 h-full text-deep-green">
                      <h3 className="text-5xl font-extrabold p-10">{item}</h3>
                      </div>
                  </SwiperSlide>
                  ))}
              </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}