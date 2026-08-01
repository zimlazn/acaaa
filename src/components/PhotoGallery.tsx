import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryItem } from '../types';
import { Heart, Plus, Camera, MapPin, Calendar, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface PhotoGalleryProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

// Default cute memories using Acaa's exact original photos
const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: '1',
    title: 'Senyum Manis Acaa 🌿',
    date: 'Momen Indah Kita',
    location: 'Taman & Outdoor',
    imageUrl: 'https://lh3.googleusercontent.com/rd-d/ALs6j_GtMXJpkrmNJvXXqdLsHlHj2bfjLoEzTaWUhoD8btm9EUcI7WCSs_jVG5X8AQcJozEpi9ECsH3rN23wzZ-KSmdiYikhWBgQMel94_MC4G91BM7KXE_V086DHLtQ67PTADWiavSkccW0G0DhwVKGdIb8AaOdAvELa1z7PUK_mUb9apKc1G2LkrA8lDurPcb-QufAsj2AQbzCIHZz50h59Q646d_OWZYnLOHHMKrmBloS27CIvEFHjgfwDIETfB4tg09miN5wiR407Vi-znxgYH8wATYMantaJzzOHSDWhVI6pfTShSR_m7wC80EFDzUc13ycwgPT8irV32MNOCfNp1lPZo-YNCHqiLjOoyyIvPmMcziblFsUZYHg0kd9cNNXmt5Xc9hk0NpDHPhjgQXBRNCEb0KEEXfJsYaVod6HOWUfeocNmwh-qqUEnALvJY5cL98WkJ4TcpH1Gun_xoXD5uJtY6gBCQxdEOFp8gtmIIOUdmEx4ieu_AwSX916OdNsV3YANpZyObwQ6ZXqveLAPOCZ9Httuv7JNg1FoBCMAIfprnozfWH6dHNmly9oKT3_oddy5md_Rg64mnBObuRYQM_A26UySfYXbQSVLLUFWb0_UpbHNk-wFPabsUWmJhGG9Ckw39Wx2De6BqN3SFUF7mxTDW4ZTR53-biakCfbPV1IxA9Vl3AQzZXpe7OHM7dJcWryhLkuwp9u16Qi5LdCW5RLPBO5XLQW4JpRjCzIL4PsIKJuEwC3RbgZzhRyXb1U6DWgNKsB16WTn2HJFkaNV_sbPBYxYFSNE7ToURg0x1XmVunS2PGEoR_I5bYTuaBjvfvhcem9JCS_2jcJnlNhPS83A88QkiTwjO2NaTB_tukW5H7Ss-wStLal5Rj2u6YtaINGvAJCn5-0cCIPVw3--bM125Bfn947hPzJUFlaeFB3oauL5kO39FPQZ3wR0oZ-hb50o4doigyenK3VX0FikRdCyvJA5Bnb2HsO9fsVRUB3LPSqPZdxECQHLjpDfzWXpbFqvQRIIHHWZO7XOytEfn9rzitV6x0ZMug9cpzFz1HuUIELq_tas6IxjbZZdlBN7RTwspBFDPhuti6qll11Weh9Fdn21A=w1920-h912?auditContext=prefetch',
    note: 'Senyum Acaa di foto ini tuh selalu sukses bikin hari-hari yang berat terasa jauh lebih ringan dan bahagia seketika! 💕',
    category: 'milestone',
    heartCount: 99,
  },
  {
    id: '2',
    title: 'Foto Box V-Sign ✌️',
    date: 'Momen Seru Kita',
    location: 'Photo Booth Studio',
    imageUrl: 'https://lh3.googleusercontent.com/rd-d/ALs6j_EJR5fdRNfuS6A-cRpW-xahaEOm8IO-IREuYuCkwV0NOnVlhmxCaCkRbEHRI_5K6GvD3sCcPqPJww74jRp4iUTVZOQo41Kf9lOe4ae2fw1GmIYTYMjc77rxY9jHVG9tU3WvZ2hNDk6-Lo4cszoxDFpjzVykm7He3J98q2nXmYH4Z_HTAnZVRxbyeqlmyFPrNDxZobo8dA8xM7BfcLG6Ms0_XDy7o7izAzsufZlQdVlc_KLmD_TRouYi3k_40vg1QcTJs-6pMnxGpF_xZzJunuzmKe3iMlkWy_5ir5SYti6VOMnbYHdS6IWkgol1P1dU6rb9emW8B6uxg7kQR1Qcb6wO0waSwf-Yf6IG9BStG5DAcEEKx39qaWMg92jPgM0vdEbfo-wIQ1KySJ5f6e5fkFrwH0Z5gNnxo74wm77UXvigQb-jd7XKjEgNCQUfs4kLYeRBedtRdcSmma9mYt-PsTbf6yHGT2KXtw7xlvEghkbJ1obD2__huayYURrXf8nW35TdiW7i5_76ZEf1Wr8oq36VumnXkcM90w8kTQNX3hNIDXeXUkJBwxfij6qUa6wTZOa50_Mug_vMOYhpPu4mOQWXiT47OzRkkS8ckec1kBEBylTxYNbOhOrR6ZdaPlTH2SlNnu6Gu1MIvre7owuT5nMPhYKjvEoNQ0wMSgYslm6NQCUVdp4a4P0ujbhVBW24SX40WrKjCny8_sCqdKlgH2sg1yq_HDlre0znt1O73Xu257yLsEoRPLUaUS4mOm5XWi798pPSu8bXr1-u6xRGKmCUV-FIiAK1xeYMxpJqInFV2pc8iUvMmtZLOGeUfkrCfaPCJirT1gTkyNqsrRYIu5OmbdUuTii56ElTQXi23wMFBeisqhfV50oJu7qsieZi3UPibPCiaaIRRjYjiy5nNXjd39XCmZiIyThu32GskwSXYLRq4o-73G8kbQoh3KzmxzaRz8UIUXhY0GPGz-VBBmVw-7rOUmot0sX8AnPAMs9SxT6wVES4SDOkJ7J38Gmfw-V-l1GMAeGIFpH4ybQMYUTMBpBYA8i4TM4VhvyMtmqnt1acEj21GpqmjWliakna6EuIgh0Qjv6H57teMfGvk48OdCb-z2Q=w1227-h912?auditContext=prefetch',
    note: 'Gaya V-sign andalan Acaa! Sweater Garfield plus hijab yang selalu bikin Acaa makin cantik & gemes banget. 🥰',
    category: 'fun',
    heartCount: 108,
  },
  {
    id: '3',
    title: 'Kencan Kopi & Muka Gemoy ☕',
    date: 'Sore Hari Santai',
    location: 'Cozy Cafe Spot',
    imageUrl: 'https://lh3.googleusercontent.com/rd-d/ALs6j_F5oHDxtsn2xrPOSzTe6C8BikNIDdNnIOSNhLOd1TvbQfhMRDPw41mVTdJEFXC0e6BZfaLZTcjoFOCkfXQbJNzVsDICI_E4EjQ30FylafEJVYPcib8YQI4b2vt2CwA_b-IK4-cRMLKCTld4EzSHxZBtJ_dV82eZugpczZwte2BQp040KglYqFwjRbA6DfgtCyVSeBlSFArD5pFXFm2MQx2Flt4uusmT9Y-IxRXR8-OdDWbGyweO6F6jo2iWGGBjp3jRGfdTXZl_q63DqgS7lRtlAXJH1qZYEnBWH7YzNp_HPupkWfQfOoAqT30QKiSsNwQ8KePi13S4qeZwHxv6h8UUVRkrTlKyw6qzCd2xaza72DxumG3rGVU-T_Emx6gXa0Emb1_i-Gy6goQdVTmS2aCleQE5q1nBm4XKC1qKrivYuDLZBT-34qv2seCyLgZT9xkimpgKiO6a-J51cVrO2viF0rS2nHdMZQXvEfC46Cx5HgJBzWK7VYaWjXccBbyRcRm7oowYDkQ6NigJqyMQI3OfmYbpgphqX9dqZUsKswmRYEQ89xQOEgLOfFOSBd76XVGvU-mbuKomiwkLllEZpmYnsfyRysVn3yDrGh8zbfOlpQCGjkEo4QBHD6-7z-dcGSbLHCrBI03jxGVqgw9-Rd_sqn77flf2jw_Hv9T3jAN-s8ePdBZA9v9A5qz1fAIeEWUT2qBXOeZyjBS96WC3xIvgxB-FUOwdfPoCO-mceYcqsbedIxvkQNED4TN2werrSwEJ4Hf7LtcfjpUk8L_HLa_AV043fheNlOTCb1fqPkT-WjL3JiJThdjB3B1ivn8Qc0IiivBvpu2utYsyosF47U7aCKi9qZdIVtzU9kuOBpPAnvaGirIG5X-zD15st6nfF8q1mNBEcO-JNoL7MxpBsh-ciDPqb6tEdHzn0bqNQgdlY4X0WIUlThiGiKaLvFaqdA-PeJCRnIEgWuQwJAh0wcXDpchJ8daj1hc1uSlVZU4ok8KNTeHhD1QMy_Xkf6el3y3lYxqOaxVPJQxD1gj5_hFfEdTQ4M3XV-VVOWmuNsQnnrDUq1A5xH7AytqmvzFQkcH6_YKTeYe3xFRuxVpPg8J3DpfvQIs=w1227-h912?auditContext=prefetch',
    note: 'Pose pouting face andalan Acaa pas kencan kopi! Nggak pernah bosen ngobrol dan ketawa berjam-jam bareng Acaa. ✨',
    category: 'date',
    heartCount: 115,
  },
  {
    id: '4',
    title: 'Anggun Pas Acara Formal 👔',
    date: 'Acara Spesial',
    location: 'Main Event Hall',
    imageUrl: 'https://lh3.googleusercontent.com/rd-d/ALs6j_H8xH-5GSeSYdIMb4x0Bug0prwuRQltX9L5hISjp3rAvTZalKfGelD-MkwesqyT_Qq3r3H7GgUEg8pzrrmYSWDabdo1A-VojDFft0lsu4rrgD4shZOir5sUkJpdHqxvDdfUk9XSpTuDFNRComyV3LZauV1YD2XjcDNn3s7GST5LAjVUfFSBIqcIhEWD6YRXr5xaG-j87m2rc765KiKS9VA7agaG5MkQEZ2dy31ts5uuxyWSWsAGcB2ocU7XaVaZkqugT2GCto4W8Ig0c26on_bcJeC7n1xzEUzUSK475NADkB1ahUcQSz5Thy3vaQSO000g7EYuA0_n4Xe3QRevxF-edBLT3O67kbNDFswrRMLkg8B3husoH7JlFqoApu-LsH2YgI3pDE3u6L20hF59UM2N198bc2fI-NkvNa6rqIbau2x07dPWHvlPgoYpp6Gmu14ADqKXBskHb6Dp2cGZIxbbPSC4YzNAojkxqV6ntqwIYbfGw_LcLSzXsXYSYIWt5lePB6BiuENXcMW_0HMUr896jbAOKqSySg609clgLmKCGEs_GWyrB6BtC3C3ua_tSS6DvX5X0VjhYao8G58Kkn5y489NS3SoJlRxAUy5yDlnCNw0cBIOBuolSjfbnlG_WgYRJjdq7W2n74j261WON3FfRY4cuc3to9Kh71zvln-DqyTWH36fDIU4H1qL9EC54jjVdhF1Yajk6r7jpZcO3tV9qYzMP_gnNIMgy_STUBa7tQ7HubK4trnFZFuP0ztTpvy_mBiUZFygV5NU2zpdHA7C23GzQK279DP6UtZRsZMObcaT1BN5D82aDaxuQDmTNQ1FcuY3-lXJ1BfUFjI0v43ANBn71Z5_p6DKhNyUbW4bsvNEOICxfki97FPaumt4Of4QwLN3kIKkkq3OwfYmAj0IhBMFO-l-P6m8xeizDTWQEc-fZLNW0WOXJLRuHFnn5jMREMjDQ2CZ3h2vHFOzvrg6_hlStfB251xdXZYlE5PdQhjWy74D5dvalkyNDLCUKSulp7kk7wQRTgDhHF8Fqv_ecSa1iowI7tR_kUwol_--kjRbypQJAP1FsQPG_xacl4vXUFs_wsmzkSu7n9OwoBdmyKguZ4xuuMT6GQ=s1227-w1227-h912?auditContext=prefetch',
    note: 'Acaa cantik banget pas dandan rapi dan formal! Dagu tersandar manja yang selalu bikin hati adem. 💖',
    category: 'cute',
    heartCount: 120,
  },
  {
    id: '5',
    title: 'Finger Heart & Pose Lucu 🫰',
    date: 'Momen Ketawa Bareng',
    location: 'Gedung Acara',
    imageUrl: 'https://lh3.googleusercontent.com/rd-d/ALs6j_FPVwtXJycIEXQS-D41-_jMl3Ps0kblp5oiN3rHQPFjhB031JHmY0V7o8A3wvxPQTxK5UteRuXi9CzJYzgfiKnJyGxaCrodEy-GeGkuKy-QyLE1LPqA2wwS7E1s_aMwXCkJde43_w234a-VEw9X6A_dymJ91SHqp5hkyhQLeP4rNIlNMhOmzcdgPNbSs-nePhtcIu41Bg8DiquBDaHnKnlYwc3memcmS9NTKwkF1wu9apuEnKYix0JsbQ4mDGnSjX1HPOpoN1TrtDGmTZzQHyewTwTVEVgA9xLzJ5gZqFfcX7ll-oALsQxIibs3RG_i1gwSKUPQhDb6LIgrcj0iQJhhFD8lJaa5rp7YVOirOqNkyz-kKQpkedUj2TUKi92gd2uZNiU83U9zKtYoJBHmcQ1mFpta1prEKoRSE_0wRnHc-JoQfUDK0x3AmuxGU1p7g4D0Z0G8H_2WCJBwOQUJ6OTW0NqHLgnJMECILDDCLctkdTCzEft8PsrgA0DMlgO2p8T1PVuH2UAJQW7wZ3dkv_WQURocOZo7AYXf51bBWPiSIB-HsL2_dXx73t5J5dA446AclNRL7RHXBxPRwGWRoa6fUezbjOKqDDCuz_klWERPfma52_XcIHBIAkiqrJDNR8M2JNTdXQmigQOf22sRGPU6N6tHZjWjgqYicS3hU1fZ5svXWc2l6Q9D2B01jvWvkA0VSL507ZbR-Nu94S0PMATSMu8PHl46uKpwKTbMYk0S3bZBxQVGZ1uu7aJxDnakhjTMdtxVS20j0pZFGbJJt7sh8_7K9ZvHPuaWt8_bgGBt5yw5s_dpS_OFfYDq478yESdb1BA3HLvEIKIDukTeftBRec771vbA09jtvn8NbXPo3Q5WvMcmWq3yaBlNuyMoaFwBVj05Q8ycOwVj6D5gtTlRfa8ao2RGqhJGZcdgnwdmVlHnOHJ1xK9y0V9AK5TLOEQmn3atZthesQkoKyN1561hz1UZZ2_KELOZAZqpsvT1A0c2m9AojE1lLFgEwA1pEjdUkojtU8iZiLeszXMceOhkKRplaeuh7ogGSjV3gWxW2di2w08rkpuUuToo_SrlEki2GfTrAulrHvMw3aS8mUf30eK2jA=w1227-h912?auditContext=prefetch',
    note: 'Pose melet + finger heart yang paling kocak tapi tetep imut! Seneng banget bisa selalu bebas bercanda bareng Acaa. 🤪',
    category: 'fun',
    heartCount: 135,
  },
  {
    id: '6',
    title: 'Konyol Bareng Di Lift 🛗',
    date: 'Momen Iseng',
    location: 'Elevator Wood Panel',
    imageUrl: 'https://lh3.googleusercontent.com/rd-d/ALs6j_FVE3DSQfN9VOnBHY6ZxMLlDZxz7dfzMQeoy6CvOy38HmhrOAyqAps5aiWzvQpYu7yNyNAOnV1OF82xBLkAi5P6gMTuqrt-r2scgLfWrO52QHRhr26WPG32mgNnXq4VpDIRpjotv9Ug-kQI6FuhZ6ROnPCCbCUpDfs_G8cL5jTBUFjAypQdFrvvV6mc9KQYYhCZSOEdj2RB_Fwv2_wz1iO4xdTcDVN1TxZUMDQA8l_bie7TFEBsX4N4rXTV5W7bUU1-4SoSAizJfKjUTGmextKGoQlsRDZ-jlIv9VhQf5wtCEL4DQVPIeLbg6jrVf97_Fj1o1m-CdqvjXzO4AW35ABOZJ9q2Xqbfb8zZIlKEyWoxUt2z0AL07n61DrYkJ4j3WkwmxZ0Ipzk3gNVJm4453yVPjYHDQHcE1Y_CwybRT89GFt4HY8JuV8XRIkpJg02LEzmz9GrBoID-mlnoGLiezeMeidZy-RR-jNJf5xZ8rkpHtrytdfgqVC1XLm7zWEb8iB72gaFo6w50-ZsaZr_H-b5ZViKabEee1bI_9MgeoGu0rEGKFV0hf4CM7KWIo7dspKMpqgR4m0i6dhuAtdRRW7MIm68XrIuHbTerWMPIXMFJPzF53Z_PtL5WmRTon37BxPxcn_jar7U52tJgtXLLyaDGjbcCHFyUtCRoZlNEAQVlDV7AQhQsWw6fUdG4U7gDA8qj9vW4OvHWV4mlL84NFdcVXR84MqBKOGA84V5PzfgkK8eKFj53A8CH2jYRe13Lqm-q_DraiC1y0skYGzSpjAkUpB0C4fAP4RabOYzVPR3R3wU6Ic_o3q2pMV1Iak7eB8Ne7JArY1R3c64cuFG6mG93cjOvzCgV3kU3-DHJ5PCL6TLPazlok3Dq_HjTWUSHT-Q-CI2ub49poo0yQThJPNR3PBEkjZgOUGdYJ8YHn_vfEY_44lDzIAvCu58BjUD6VFo46rX1dfpVUuSTFogD4UW-tKkKbmeJ6q_8P1xFi6-zRwBq4ZrKvjDj94xIBuZ03WVaY5RKmbA1iPjzcpgQJwm59Mc6mb4SiuQnw2jGD4ix86NKAgPiPQUsTFZQtZsVpT4CMc8djIckHove_0RHZLHo8oh5Q=w1920-h912?auditContext=prefetch',
    note: 'Muka behel plus pose melet pas di lift! Tiap momen absurd dan konyol bareng Acaa selalu jadi kenangan yang paling berwarna! 😜',
    category: 'cute',
    heartCount: 142,
  },
  {
    id: '7',
    title: 'Jalan Sore & Bawa Kamera 📸',
    date: 'Golden Hour Sunset',
    location: 'Hutan Pinus & Taman',
    imageUrl: 'https://lh3.googleusercontent.com/rd-d/ALs6j_EsC_XOlc9WUB2mB1Cu_BHbFd_7ZUrgXLR-LrD9OZU-4H0sRudlpx1UMV3ZJxTxIkStZPfoABWYZl1Oak6OxbwCie4LwJOZ3plfkl_qXK-6Dq0xiU6FLnVRaPLNC3Oe5W1DDea1XXYwsCQyi3tNKYMPIuNz2bzAwzKPxevXu647jRp_k_kW_ZE_AZoJ-T5xmS7GAhRYCq5JuGcXa71qH1-0xIQPLcLPoEY8cT-3D4dtcI7zTMstCoBg7N6ZQT9SoDiKCfm2gtESEnQWFv3Cn4Jp6DSpl9dUZlkBBmDBHZqXc_CFVMIRRhVho3WKvOjKJr2PzAxC3nkPQCYQHmDLqiEwr1pdFEzEEOUW9qs3RR79yphjs2uWxxpFbcl5hHt3FukXJyC-zY2RBKOJjy8P6LijSWHe8jkbF0HwEnOA0waJYGjGt-xqQ2KsNRrQs28s5y7MKb-qbZ_M2QQf1Ibu_VwXzi_RnAXflDrrN93LHSAg2GD6U6bi1TmhX6perw5RU_M4EB_GQ0FdSV9gsIfaise6vdU3OkkZTBho0FnN_AwT9s5AisSNF31fRvnPuVOlgDBh4L4iP5uercz9OX2W7gTOByYKr6NfwyG1YQNun_IpAaF_v68kx1hCSmDk6B3DNRYI2wL4j021spHxKaneEVH5FOJKOF5eY4izuRvNxAofvgkM8Oiz42F_SUbDcWUItaFz4j0tIxGpVMoKWm9Kg4hwawJZQlhZNkFrRuGl2wBWUxqyOycLsE8tgzbZDJ3u7qDIXdHabV4iDcTJNVb_oQ4EVXQn_PlUTFv7r_O62-e5DJBjh116bkh4QpIO9tVTSBZFePKBrQQZIJfnGtCagqZh13YU9HURcL-2Nmn57IUnabodv8LYsRp08hi53OXMtjbzr0LIwSAZC_niOZFPQ4Vn70z58iDvlvwmny0p9c-c0kDWYPQoy8Oa_w4bqATHvvAlUyRRw66Vb2qu-ErZT_7cJ80KyJekXaqa0Pa_Psuej0oiHFMGNVcqBvp10RBiu21CvJf1_IBDKdnvX4OJaAY9yyF9hwBoysiiBSBuCZ0do8311-ERE4wwtiKaL8MCC9MQ9Dq7Ft1BcGaTc1Rixcolqm2iJao=w1227-h912?auditContext=prefetch',
    note: 'Fotografer kesayangan lagi siap motret dengan kamera Canon. Cahaya matahari sore kalah hangat dibanding senyuman Acaa! 🌅✨',
    category: 'date',
    heartCount: 150,
  },
];

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onNextStep, onPrevStep }) => {
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('acaa_memories_original_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_MEMORIES;
      }
    }
    return DEFAULT_MEMORIES;
  });

  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for adding new photo
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    localStorage.setItem('acaa_memories_original_v4', JSON.stringify(memories));
  }, [memories]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playPop();
    setMemories((prev) =>
      prev.map((item) => (item.id === id ? { ...item, heartCount: item.heartCount + 1 } : item))
    );
  };

  const handleReplacePhoto = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFx.playPop();
      const reader = new FileReader();
      reader.onloadend = () => {
        const newUrl = reader.result as string;
        setMemories((prev) =>
          prev.map((item) => (item.id === id ? { ...item, imageUrl: newUrl } : item))
        );
        setSelectedMemory((prev) => (prev && prev.id === id ? { ...prev, imageUrl: newUrl } : prev));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    soundFx.playSparkleChime();
    const newItem: MemoryItem = {
      id: Date.now().toString(),
      title: newTitle,
      date: newDate || 'Hari Ini',
      location: newLocation || 'Tempat Spesial Kita',
      imageUrl: newImageUrl || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80',
      note: newNote || 'Momen manis bersama Acaa tersayang! 💕',
      category: 'cute',
      heartCount: 1,
      isCustom: true,
    };

    setMemories([newItem, ...memories]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDate('');
    setNewLocation('');
    setNewNote('');
    setNewImageUrl('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-pink-500">
        <span className="bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
          Langkah 3 dari 4: Foto Kita 📸
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-serif">
          Foto Kita Bersama 📸✨
        </h2>
        <p className="text-xs sm:text-sm text-pink-500 max-w-md mx-auto">
          Setiap foto punya kenangan manis tersendiri bersama Acaa.
        </p>

        {/* Add Photo Button */}
        <div className="pt-1">
          <button
            onClick={() => {
              soundFx.playPop();
              setIsAddModalOpen(true);
            }}
            id="add-photo-btn"
            className="px-4 py-2 bg-white text-pink-600 font-bold rounded-xl shadow-xs border border-pink-200 text-xs inline-flex items-center gap-1.5 hover:bg-pink-50 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-pink-500" />
            <span>Tambah Foto Kenangan Baru</span>
          </button>
        </div>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {memories.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            onClick={() => {
              soundFx.playPop();
              setSelectedMemory(item);
            }}
            className="bg-white p-4 rounded-2xl shadow-md border-2 border-pink-100 cursor-pointer relative group"
          >
            {/* Washi tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/80 border border-pink-300/50 rotate-[-1deg] rounded-xs pointer-events-none z-10"></div>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-pink-50 mb-3 border border-pink-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded-full text-[10px] font-bold text-pink-600 shadow-xs flex items-center gap-1">
                <Calendar className="w-3 h-3 text-pink-500" />
                <span>{item.date}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-gray-800 text-sm font-serif truncate">
                  {item.title}
                </h3>
                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="flex items-center gap-1 text-[11px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 cursor-pointer shrink-0"
                >
                  <Heart className="w-3 h-3 fill-rose-500" />
                  <span>{item.heartCount}</span>
                </button>
              </div>

              {item.location && (
                <div className="flex items-center gap-1 text-[11px] text-pink-400">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
              )}

              <p className="text-xs text-gray-600 line-clamp-2 italic bg-pink-50/50 p-2 rounded-lg border border-pink-100">
                &ldquo;{item.note}&rdquo;
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-3 pt-4">
        <button
          onClick={() => {
            soundFx.playPop();
            onPrevStep();
          }}
          className="px-4 py-2.5 bg-white/80 hover:bg-white text-pink-600 font-bold rounded-2xl border border-pink-200 text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Chat Pertama 💬</span>
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            onNextStep();
          }}
          className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md border border-pink-300"
        >
          <span>Lanjut ke Bunga Virtual 💐</span>
          <ArrowRight className="w-4 h-4 text-white animate-pulse" />
        </button>
      </div>

      {/* MEMORY LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border-4 border-pink-200 relative cursor-default"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-pink-100 hover:bg-pink-200 rounded-full flex items-center justify-center text-pink-600 transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 border border-pink-100 bg-pink-50">
                <img
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-500 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
                    {selectedMemory.date}
                  </span>
                  {selectedMemory.location && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-pink-400" />
                      {selectedMemory.location}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-800 font-serif">
                  {selectedMemory.title}
                </h3>

                <p className="text-xs text-gray-700 bg-pink-50/80 p-3 rounded-xl border border-pink-200 italic">
                  &ldquo;{selectedMemory.note}&rdquo;
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-pink-100 mt-2">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-xl font-bold text-xs cursor-pointer transition-colors">
                    <Camera className="w-3.5 h-3.5 text-pink-500" />
                    <span>Ganti Dengan Foto Asli 🖼️</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleReplacePhoto(selectedMemory.id, e)}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={(e) => handleLike(selectedMemory.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-bold text-xs shadow-xs cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Suka ({selectedMemory.heartCount})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD MEMORY MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border-4 border-pink-200 relative cursor-default"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-3 right-3 w-7 h-7 bg-pink-100 hover:bg-pink-200 rounded-full flex items-center justify-center text-pink-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-4 h-4 text-pink-500" />
                <h3 className="text-base font-bold text-pink-700 font-serif">
                  Tambah Foto Kenangan Baru 📸
                </h3>
              </div>

              <form onSubmit={handleAddMemory} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Judul Momen</label>
                  <input
                    type="text"
                    required
                    placeholder="misal: Jalan-jalan Makan Gelato 🍦"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none bg-pink-50/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Tanggal</label>
                    <input
                      type="text"
                      placeholder="misal: 10 Nov 2024"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none bg-pink-50/50"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Lokasi</label>
                    <input
                      type="text"
                      placeholder="misal: Cafe"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none bg-pink-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Foto (Upload/URL)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-[11px] text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-pink-100 file:text-pink-700 mb-1 cursor-pointer"
                  />
                  <input
                    type="url"
                    placeholder="Atau masukkan URL foto"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-pink-200 focus:outline-none bg-pink-50/50 text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Catatan</label>
                  <textarea
                    rows={2}
                    placeholder="Cerita tentang foto ini..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none bg-pink-50/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer text-xs"
                >
                  Simpan Foto ✨
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
