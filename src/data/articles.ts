export interface Article {
  slug: string;
  dateAr: string;
  dateEn: string;
  categoryAr: string;
  categoryEn: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  readingTimeAr: string;
  readingTimeEn: string;
  mainPhoto: { src: string; captionAr: string; captionEn: string };
  secondaryPhotos: Array<{ src: string; captionAr: string; captionEn: string }>;
  bodyAr: string[];
  bodyEn: string[];
}

export const articles: Article[] = [
  {
    slug: "back-to-school-bag-campaign-2023",
    dateAr: "أغسطس 2023",
    dateEn: "August 2023",
    categoryAr: "التعليم",
    categoryEn: "Education",
    titleAr: "انطلاق حملة الحقيبة المدرسية للعام الدراسي الجديد",
    titleEn: "Launch of the Back-to-School Bag Campaign for the New Academic Year",
    summaryAr:
      "أطلقت الجمعية حملتها السنوية لدعم الطلبة من خلال توفير الحقائب المدرسية والقرطاسية للأسر الأكثر احتياجًا، بهدف تخفيف الأعباء وتعزيز بداية تعليمية كريمة للأطفال.",
    summaryEn:
      "The association launched its annual campaign to support students by providing school bags and stationery to vulnerable families, helping ease pressure and ensure children begin the school year with dignity.",
    readingTimeAr: "٤ دقائق قراءة",
    readingTimeEn: "4 min read",
    mainPhoto: {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=85",
      captionAr: "أطفال يتسلّمون حقائبهم المدرسية بفرحة وحماس في بداية العام الدراسي",
      captionEn: "Children receiving their school bags with joy and enthusiasm at the start of the academic year",
    },
    secondaryPhotos: [
      {
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
        captionAr: "جانب من تجهيز الحقائب وفرزها قبل توزيعها على الأسر",
        captionEn: "Preparing and sorting the school bags before distributing them to families",
      },
      {
        src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
        captionAr: "أحد الآباء يتسلّم حقيبة ابنه بحضور متطوعي الجمعية",
        captionEn: "A father receiving his child's bag in the presence of the association's volunteers",
      },
      {
        src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
        captionAr: "لحظات من الفرح أثناء التوزيع في إحدى المدارس المشاركة",
        captionEn: "Moments of joy during distribution at one of the participating schools",
      },
    ],
    bodyAr: [
      "في مطلع كل عام دراسي، تنطلق جمعية زهرة المدائن بحملتها المعهودة لدعم الطلبة من الأسر الأكثر احتياجًا في القدس والضفة الغربية. وتُعدّ هذه الحملة أحد أبرز المبادرات السنوية التي تجسّد التزام الجمعية بمبدأ التعليم المستدام والكريم لكل طفل، بصرف النظر عن وضعه الاقتصادي.",
      "تضمّنت الحملة هذا العام توفير حقائب مدرسية متكاملة مزوّدة بجميع المستلزمات الضرورية، من أقلام ودفاتر وأدوات رسم، فضلاً عن مجموعة من الكتب المساندة. وقد حرصت الجمعية على اختيار مواد ذات جودة تضمن للطالب انطلاقة تعليمية لائقة وتُخفّف عن الأسرة جزءًا من الأعباء المادية المتراكمة مع بداية العام.",
      "امتدّت عمليات التوزيع على عدد من المناطق، وشملت أسرًا مسجّلة لدى الجمعية ومُحالة من جهات شريكة. وتميّزت هذه الدورة بحضور متطوعين شباب من طلبة الجامعات تطوّعوا للمساعدة في تنظيم عملية التوزيع، مما أضاف طاقة إيجابية وعملاً جماعيًا تضامنيًا حقيقيًا.",
      "\"حين رأيت الفرحة في عيون الأطفال وهم يمسكون حقائبهم الجديدة، شعرت أن هذا العمل يستحق كل جهد\"، هكذا وصفت إحدى المتطوعات اللحظة التي تجسّد فيها معنى الأثر المجتمعي.",
      "تُذكّرنا هذه الحملة بأن الدعم التعليمي ليس ترفًا، بل حقٌّ أصيل لكل طفل. وتؤكد الجمعية أن العمل على ضمان استمرارية التعليم وكرامته سيظل في صلب أولوياتها، وأنها ستواصل السعي لتوسيع نطاق برامجها التعليمية بشراكة مع المجتمع والداعمين.",
    ],
    bodyEn: [
      "At the start of every academic year, Zahrat Al-Madain Association launches its annual campaign to support students from the most vulnerable families in Jerusalem and the West Bank. This initiative is one of the association's most visible annual efforts, reflecting its commitment to sustained, dignified education for every child regardless of economic circumstances.",
      "This year's campaign included fully equipped school bags containing all essential supplies — pens, notebooks, art materials, and supplementary books. The association was careful to select quality materials that give each student a proper start to the school year while easing some of the financial pressure that families face as a new term begins.",
      "Distribution operations covered several areas, reaching families registered with the association and those referred by partner organizations. This round was also distinguished by the participation of young university student volunteers who helped organize the process, adding positive energy and a spirit of genuine collective solidarity.",
      "\"When I saw the joy in the children's eyes as they held their new bags, I felt that this work is worth every effort,\" described one volunteer — capturing the moment that embodies the meaning of community impact.",
      "This campaign reminds us that educational support is not a luxury — it is a fundamental right of every child. The association affirms that ensuring the continuity and dignity of education will remain at the heart of its priorities, and it will continue working to expand its educational programs in partnership with communities and supporters.",
    ],
  },
  {
    slug: "community-initiative-vulnerable-families-2023",
    dateAr: "أبريل 2023",
    dateEn: "April 2023",
    categoryAr: "الإغاثة الإنسانية",
    categoryEn: "Humanitarian Relief",
    titleAr: "مبادرة مجتمعية لدعم الأسر الأكثر احتياجًا",
    titleEn: "Community Initiative to Support Vulnerable Families",
    summaryAr:
      "ضمن جهودها الإنسانية، نفّذت الجمعية مبادرة موجهة للأسر الأكثر احتياجًا، ركزت على تخفيف الأعباء وتعزيز التكافل في المجتمع المحلي.",
    summaryEn:
      "As part of its humanitarian efforts, the association implemented an initiative focused on vulnerable families, aiming to ease hardship and strengthen solidarity within the local community.",
    readingTimeAr: "٥ دقائق قراءة",
    readingTimeEn: "5 min read",
    mainPhoto: {
      src: `${import.meta.env.BASE_URL}images/news/community-initiative-vulnerable-families-2023/main-photo.jpg`,
      captionAr: "فريق الجمعية خلال جولة ميدانية لتوزيع الدعم الغذائي على الأسر المستفيدة",
      captionEn: "The association's team during a field round distributing food support to beneficiary families",
    },
    secondaryPhotos: [
      {
        src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
        captionAr: "تجهيز الحصص الغذائية استعدادًا للتوزيع على الأسر",
        captionEn: "Preparing food packages in preparation for distribution to families",
      },
      {
        src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
        captionAr: "لقاء ميداني مع أحد المستفيدين لمتابعة احتياجاته ووضعه",
        captionEn: "A field meeting with one of the beneficiaries to follow up on his needs and situation",
      },
      {
        src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
        captionAr: "متطوعو الجمعية في جلسة تنسيقية قبيل انطلاق المبادرة",
        captionEn: "Association volunteers in a coordination session before the initiative launch",
      },
    ],
    bodyAr: [
      "في إطار برنامج الإغاثة والدعم الإنساني الذي تُنفّذه جمعية زهرة المدائن على مدار العام، أطلقت الجمعية خلال شهر أبريل مبادرة مجتمعية خاصة استهدفت شريحة من الأسر التي تمرّ بضغوط اقتصادية مُتصاعدة نتيجة جملة من الأوضاع المحيطة.",
      "شملت المبادرة توزيع حصص غذائية متكاملة تغطي الاحتياجات الأساسية لمدة شهر، إضافة إلى دعم الضروريات المنزلية لعدد من الأسر التي أشارت التقييرات الميدانية إلى احتياجها لتدخل فوري. وقد حرصت الجمعية على أن يتم التوزيع بأسلوب يحفظ كرامة الأسر ويُراعي خصوصيتها.",
      "يستند عمل الجمعية في هذا البرنامج إلى منهجية ميدانية تشاركية تعتمد على التواصل المباشر مع الأسر وتقييم احتياجاتها الفعلية، بدلاً من الاكتفاء بالبيانات المجردة. ويُشرف على عمليات التقييم والمتابعة فريق مُدرَّب من المتطوعين والعاملين في الجمعية.",
      "تقول إحدى الأسر المستفيدة: \"ما يميّز الجمعية أنهم يسألون ويهتمون، ليس فقط بما نحتاجه ماديًا، بل بحالنا بشكل عام. هذا الاهتمام يُشعرنا بأننا لسنا وحدنا\".",
      "تُجسّد هذه المبادرة نهج الجمعية القائم على الجمع بين الاستجابة الإنسانية العاجلة والمتابعة الإنسانية المستمرة. وتُؤكد الجمعية التزامها بالاستمرار في هذا البرنامج وتطويره بما يخدم الأسر ويُعزّز حضور التضامن المجتمعي في أوقات الضغط.",
    ],
    bodyEn: [
      "As part of the relief and humanitarian support program that Zahrat Al-Madain Association implements throughout the year, the association launched a special community initiative in April targeting families experiencing increasing economic pressure due to a range of surrounding conditions.",
      "The initiative included distributing comprehensive food packages covering basic needs for one month, as well as support for household essentials for a number of families that field assessments identified as requiring immediate intervention. The association was careful to ensure distribution was carried out in a manner that preserves the dignity and privacy of each family.",
      "The association's approach in this program is grounded in a participatory field methodology — engaging directly with families and assessing their real needs rather than relying solely on abstract data. Assessment and follow-up operations are supervised by a trained team of volunteers and association staff.",
      "One beneficiary family shared: \"What makes this association different is that they ask and they care — not just about what we need materially, but about our general situation. This attention makes us feel we are not alone.\"",
      "This initiative embodies the association's approach of combining urgent humanitarian response with continuous humane follow-up. The association reaffirms its commitment to sustaining and developing this program in ways that serve families and strengthen community solidarity during times of hardship.",
    ],
  },
  {
    slug: "regional-engagement-partnerships-2023",
    dateAr: "نوفمبر 2023",
    dateEn: "November 2023",
    categoryAr: "الشراكات",
    categoryEn: "Partnerships",
    titleAr: "حضور إقليمي وبناء شراكات مجتمعية",
    titleEn: "Regional Engagement and Community Partnership Building",
    summaryAr:
      "شاركت الجمعية في نشاط مجتمعي خارج فلسطين ضمن جهودها لتوسيع العلاقات وبناء شراكات تخدم رسالتها التنموية والإنسانية.",
    summaryEn:
      "The association took part in a regional community activity outside Palestine as part of its efforts to expand relationships and build partnerships that support its development and humanitarian mission.",
    readingTimeAr: "٣ دقائق قراءة",
    readingTimeEn: "3 min read",
    mainPhoto: {
      src: "https://images.unsplash.com/photo-1542810634-71277d95dc8c?w=1400&q=85",
      captionAr: "ممثلو الجمعية في لقاء إقليمي جمع عددًا من المنظمات المجتمعية الشريكة",
      captionEn: "Association representatives at a regional gathering bringing together partner community organizations",
    },
    secondaryPhotos: [
      {
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
        captionAr: "جلسة حوارية مفتوحة حول التجارب المجتمعية المشتركة",
        captionEn: "An open dialogue session on shared community experiences",
      },
      {
        src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
        captionAr: "توقيع مذكرة تفاهم مع إحدى المنظمات الشريكة لتوسيع التعاون",
        captionEn: "Signing a memorandum of understanding with a partner organization to expand cooperation",
      },
      {
        src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
        captionAr: "لقطة جماعية للمشاركين في ختام فعاليات اللقاء الإقليمي",
        captionEn: "Group photo of participants at the closing of the regional meeting's activities",
      },
    ],
    bodyAr: [
      "في خطوة تُعزّز حضورها الإقليمي وتوسّع شبكة علاقاتها المؤسسية، شاركت جمعية زهرة المدائن في نشاط مجتمعي إقليمي جمع عددًا من المنظمات الأهلية والمجتمعية من مناطق مختلفة، في إطار يهدف إلى تبادل الخبرات وبناء شراكات فاعلة تخدم الرسائل المشتركة.",
      "تضمّن النشاط جلسات حوارية مفتوحة تناولت نماذج من العمل المجتمعي وتحدياته، إضافة إلى ورش عمل تركزت على آليات التعاون بين المنظمات وتطوير استراتيجيات مشتركة للاستجابة للاحتياجات الميدانية. وأتاح اللقاء فرصة حقيقية للتعرف على تجارب متنوعة وإثراء المنظور التنموي للجمعية.",
      "أبرز ما خرجت به الجمعية من هذا اللقاء هو توقيع مذكرة تفاهم أولية مع إحدى المنظمات الشريكة، تُمهّد لتعاون مستقبلي في مجالات التدريب وتبادل الخبرات ودعم برامج تمكين الشباب. ويُمثّل هذا التوجه جزءًا من استراتيجية الجمعية لبناء منظومة شراكات متنوعة تُغذّي عملها وتُعزّز أثره.",
      "قال مدير أحد البرامج في الجمعية: \"الشراكة ليست فقط تعاونًا في الأنشطة، بل تبادل للرؤى والتجارب الذي يُغنينا ويُطوّر من طريقة عملنا. هذه اللقاءات تجعلنا نرى عملنا بعيون أكثر اتساعًا\".",
      "تُواصل الجمعية انفتاحها على الفضاء الإقليمي وتطمح إلى بناء علاقات مؤسسية تخدم رسالتها دون أن تُبعدها عن جوهر انتمائها وأولوياتها المجتمعية في القدس والضفة الغربية.",
    ],
    bodyEn: [
      "In a step that strengthens its regional presence and expands its institutional network, Zahrat Al-Madain Association participated in a regional community activity that brought together a number of civil and community organizations from different areas — a gathering aimed at exchanging experiences and building effective partnerships that serve shared missions.",
      "The event included open dialogue sessions covering models of community work and their challenges, as well as workshops focused on mechanisms for inter-organizational cooperation and developing joint strategies to respond to field needs. The gathering offered a genuine opportunity to learn from diverse experiences and enrich the association's development perspective.",
      "Among the most significant outcomes was the signing of a preliminary memorandum of understanding with a partner organization — paving the way for future cooperation in training, knowledge exchange, and youth empowerment program support. This direction is part of the association's strategy to build a diverse partnership ecosystem that nourishes its work and amplifies its impact.",
      "A program manager at the association noted: \"Partnership is not just collaboration in activities — it is an exchange of visions and experiences that enriches us and develops the way we work. These gatherings help us see our work through wider eyes.\"",
      "The association continues to maintain its openness to the regional space, aspiring to build institutional relationships that serve its mission without distancing it from the core of its identity and community priorities in Jerusalem and the West Bank.",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
