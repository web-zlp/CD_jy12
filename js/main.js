/* =====================================================
   蜀韵·成都 文化旅游宣传网 - 首页交互脚本
   功能：Banner 轮播图（自动播放 + 左右切换 + 圆点指示）
   说明：本文件与 index.html 结构完全分离
   ===================================================== */

// ---------- 获取轮播图相关 DOM 元素 ----------
const banner = document.getElementById("banner");   // Banner 容器（用于鼠标悬停暂停）
const slides = document.querySelectorAll(".slide"); // 所有轮播图
const dots = document.querySelectorAll(".dot");     // 所有指示圆点
const prevBtn = document.querySelector(".btn.prev"); // "上一张"切换按钮
const nextBtn = document.querySelector(".btn.next"); // "下一张"切换按钮

const AUTO_INTERVAL = 3000; // 自动播放间隔时间（毫秒），即每 3 秒切换一张
let currentIndex = 0;       // 当前显示的轮播图索引
let timer = null;           // 自动播放的定时器句柄

// ---------- 切换到指定索引的轮播图 ----------
function goToSlide(index) {
    // 通过取模运算处理越界，实现首尾循环轮播
    currentIndex = (index + slides.length) % slides.length;

    // 先移除所有轮播图与圆点的高亮样式
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // 再为当前索引对应的轮播图与圆点添加高亮样式
    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
}

// ---------- 切换上一张 / 下一张 ----------
function prevSlide() {
    goToSlide(currentIndex - 1); // 上一张
}

function nextSlide() {
    goToSlide(currentIndex + 1); // 下一张
}

// ---------- 自动播放控制 ----------
function startAutoPlay() {
    timer = setInterval(nextSlide, AUTO_INTERVAL); // 定时切换到下一张
}

function stopAutoPlay() {
    clearInterval(timer); // 清除定时器，暂停自动播放
}

// 手动操作（点击按钮 / 圆点）后重置计时，避免立即跳转
function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// ---------- 绑定事件 ----------
// "上一张"按钮：切换后重置自动播放计时
prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoPlay();
});

// "下一张"按钮：切换后重置自动播放计时
nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoPlay();
});

// 点击指示圆点：跳转到对应轮播图并重置计时
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        goToSlide(index);
        restartAutoPlay();
    });
});

// 鼠标悬停在 Banner 区域时暂停自动播放，移出后恢复
banner.addEventListener("mouseenter", stopAutoPlay);
banner.addEventListener("mouseleave", startAutoPlay);

// ---------- 页面加载完成后初始化轮播 ----------
goToSlide(0);     // 默认显示第一张轮播图
startAutoPlay();  // 开启自动播放
