<template>
    <Layout>
        <div class="wrapper">
            <main>
                <h1>
                    درباره‌ی ما
                </h1>
                <hr>
                <p>
                    رنگ برند ابزاری برای مطالعه و انتخاب رنگ مناسب برای برندها است.
                </p>
                <p>
                    رنگ برند را توسط <strong>جاوید ایزدفر</strong> به کمک <strong>ستاره کریمی</strong> و <strong>مهرنوش دشتی</strong> به عنوان یک پروژه‌ی متن باز در سال ۱۳۹۵ <a href="https://github.com/IKAcc/RangeBrand" rel="noreferrer noopener" class="visible-link">شروع شد</a>. همکنون نیز همچنان نگه‌داری از وبسایت و بروزرسانی داده‌ها به صورت مشارکتی و از طریق <a href="https://github.com/RangeBrand" rel="noreferrer noopener" class="visible-link">گیتهاب</a> انجام می‌شود.
                </p>
                <p>
                    در حال حاضر، خدمتی که رنگ برند به کاربران خود ارائه می‌دهد، <g-link to="/brands/" class="visible-link">
                        لیستی از برندهای مطرح در ایران
                    </g-link> به همراه رنگ‌های رسمی آ‌ن‌هاست. به کمک این لیست می‌توان به عنوان مثال، رنگ‌های رسمی شبکه‌های اجتماعی را به سرعت پیدا کرد و در پروژه‌ها استفاده کرد.
                </p>
                <hr>
                <h2>
                    ابزارهای استفاده شده
                </h2>
                <ul>
                    <li>
                        فونت‌ها ساخته شده توسط <strong>صابر راستی‌کردار</strong> از وبسایت <a href="https://rastikerdar.github.io/vazir-font/" target="_blank" class="visible-link" rel="noopener noreferrer">فونت وزیر</a>
                    </li>
                    <li>
                        آیکون‌ها ساخته شده توسط <strong>Kiranshastry</strong> از وبسایت <a href="http://flaticon.com" target="_blank" class="visible-link" rel="noopener noreferrer">flaticon.com</a>
                    </li>
                    <li>
                        طراحی‌ها ساخته شده توسط <strong>Katerina Limpitsouni</strong> از وبسایت <a href="https://undraw.co/" target="_blank" class="visible-link" rel="noopener noreferrer">undraw.co</a>
                    </li>
                </ul>
                <hr>
                <h2>
                    کارهای پیش‌رو
                </h2>
                <ul>
                    <li v-for="(task, i) in tasks" :key="i" :class="task. status">
                        {{ task.title }}
                    </li>
                </ul>
            </main>
        </div>
    </Layout>
</template>

<script>
export default {
    metaInfo: {
        title: 'درباره‌ی ما',
    },
    data: () => ({
        tasks: [
            {
                title: 'اضافه کردن برند‌های جدید',
                status: 'indefinite',
            },
            {
                title: 'اضافه کردن رنگ‌های جدید',
                status: 'indefinite',
            },
            {
                title: 'اضافه کردن صفحه‌ی جزئیات رنگ برند‌ها',
                status: 'done',
            },
            {
                title: 'اضافه کردن امکان تنظیم رنگ‌ها',
                status: 'done',
            },
            {
                title: 'اضافه کردن امکان شبیه‌ساز کوررنگی',
                status: 'done',
            },
            {
                title: 'اضافه کردن امکان خروجی گرفتن از رنگ‌ها',
                status: 'done',
            },
            {
                title: 'اضافه کردن امکان ایجاد سایه‌ها (shade) بر اساس هر رنگ',
                status: 'done',
            },
            {
                title: 'اضافه کردن صفحه‌ی محاسبه‌ی کنتراست رنگی',
                status: 'done',
            },
            {
                title: 'بازنویسی و بهبود تجربه‌ی کاربری عملیات تنظیم رنگ‌ها',
                status: 'todo',
            },
            {
                title: 'اضافه کردن صفحه‌ی اطلاعات تکمیلی یک رنگ مشخص',
                status: 'todo',
            },
            {
                title: 'اضافه کردن امکان تشخیص تم رنگی بر اساس تصویر',
                status: 'todo',
            },
            {
                title: 'اضافه کردن امکان اعمال رنگ‌ها بر روی ماک‌آپ',
                status: 'todo',
            },
            {
                title: 'اضافه کردن توضیحات به هر برند',
                status: 'todo',
            },
            {
                title: 'اضافه کردن تصویری از رنگ‌ها برای بهبود نتیجه موتور جستجوگر در تب تصاویر',
                status: 'todo',
            },
            {
                title: 'اضافه کردن امکان محاسبه‌ی رنگ‌های تکمیل کننده',
                status: 'todo',
            },
        ],
    }),
};
</script>

<style lang="postcss" scoped>
    main {
        @apply py-4 text-black text-opacity-80;
    }
    h1 {
        @apply font-bold text-3xl my-4 text-rb-violet-500;
    }
    h2 {
        @apply font-bold text-xl my-4 text-rb-violet-500;
    }
    hr {
        @apply border-gray-200 my-4;
    }
    p {
        @apply mb-4;
    }
    ul {
        @apply list-disc list-inside;
    }
    .indefinite {
        &:after {
            content: '- در حال تکمیل';
            @apply font-bold;
        }
    }
    .doing {
        &:after {
            content: '- در حال انجام';
            @apply text-rb-violet-500 font-bold;
        }
    }

    .done {
        @apply opacity-30;
        &:after {
            content: '- انجام شده';
            @apply font-bold;
        }
    }
</style>
