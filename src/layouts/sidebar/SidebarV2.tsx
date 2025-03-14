import { useCallback, useEffect, useRef } from 'react';
import { IconType } from 'react-icons';
import { FiLogOut } from 'react-icons/fi';
import { CgSandClock } from 'react-icons/cg';
import { IoDocumentText, IoShieldSharp, IoColorFilter } from 'react-icons/io5';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { MdAttachMoney, MdEngineering } from 'react-icons/md';
import { FaMotorcycle } from 'react-icons/fa';
import { HiWrenchScrewdriver } from 'react-icons/hi2';
import { PiBuildingOfficeDuotone, PiMotorcycleLight } from 'react-icons/pi';
import { FaUserGroup, FaMinus } from 'react-icons/fa6';
import { GrWorkshop } from 'react-icons/gr';
import SidebarRecursive from './SidebarRecursive';
import { AppDispatch, RootState } from '../../store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarDatas } from '../../store/reducer/sidebarSlice/SidebarSlice';

type Node = {
    name: string,
    nodes?: Node[],
    reactIcon?: IconType,
    path?: string,
    relatePath?: string[],
    noSubMenu?: boolean,
};

export default function SidebarV2({ className }: { className?: string }) {
    const claimHistoryMenu: Node[] = [
        {
            name: 'ประวัติรถเข้าเคลม',
            nodes: [
                {
                    name: 'ประวัติรถเข้าเคลมทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/claim-history-lists',
                    relatePath: ['/claim-history-lists/edit'],
                },
                {
                    name: 'เพิ่มประวัติรถเข้าเคลม',
                    reactIcon: FaMinus,
                    path: '/add-claim-history',
                },
            ],
            reactIcon: CgSandClock,
            relatePath: ['/', '/claim-history-lists', '/claim-history-lists/edit', '/add-claim-history'],
        },
    ];
    const documentMenu: Node[] = [
        {
            name: 'ใบสั่งงาน',
            nodes: [
                {
                    name: 'ใบสั่งงานทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/work-order-lists',
                    relatePath: ['/preview-work-order/', '/work-order-lists/edit'],
                },
                {
                    name: 'สร้างใบสั่งงาน',
                    reactIcon: FaMinus,
                    path: '/create-work-order',
                },
            ],
            reactIcon: MdEngineering,
            relatePath: ['/work-order-lists', '/work-order-lists/edit', '/preview-work-order/', '/create-work-order'],
        },
        {
            name: 'ใบเสนอราคา',
            nodes: [
                {
                    name: 'ใบเสนอราคาทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/quotation-lists',
                    relatePath: ['/preview-quotation/', '/quotation-lists/edit'],
                },
                {
                    name: 'สร้างใบเสนอราคา',
                    reactIcon: FaMinus,
                    path: '/create-quotation',
                },
            ],
            reactIcon: IoDocumentText,
            relatePath: ['/quotation-lists', '/preview-quotation/', '/quotation-lists/edit', '/create-quotation'],
        },
        {
            name: 'ใบปะหน้า',
            nodes: [
                {
                    name: 'ใบปะหน้าทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/quotation-cover-lists',
                    relatePath: ['/quotation-cover-lists/edit'],
                },
                {
                    name: 'สร้างใบปะหน้า',
                    reactIcon: FaMinus,
                    path: '/create-quotation-cover',
                },
            ],
            reactIcon: IoDocumentText,
            relatePath: ['/quotation-cover-lists', '/quotation-cover-lists/edit', '/create-quotation-cover'],
        },
        {
            name: 'ใบแจ้งหนี้ / ใบวางบิล',
            nodes: [
                {
                    name: 'ใบแจ้งหนี้ทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/pre-invoice-lists',
                    relatePath: ['/pre-invoice-lists/edit'],
                },
                {
                    name: 'สร้างใบแจ้งหนี้',
                    reactIcon: FaMinus,
                    path: '/create-pre-invoice',
                },
            ],
            reactIcon: FaFileInvoiceDollar,
            relatePath: ['/pre-invoice-lists', '/pre-invoice-lists/edit', '/create-pre-invoice'],
        },
        {
            name: 'ใบเสร็จรับเงิน',
            nodes: [
                {
                    name: 'ใบเสร็จรับเงินทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/receipt-lists',
                    relatePath: ['/receipt-lists/edit'],
                },
                {
                    name: 'สร้างใบเสร็จรับเงิน',
                    reactIcon: FaMinus,
                    path: '/create-receipt',
                },
            ],
            reactIcon: MdAttachMoney,
            relatePath: ['/receipt-lists', '/receipt-lists/edit', '/create-receipt'],
        },
    ];
    const dropdownListMenu: Node[] = [
        {
            name: 'บริษัทประกันภัย',
            nodes: [
                {
                    name: 'บริษัทประกันภัยทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/insurance-company-lists',
                    relatePath: ['/insurance-company-lists/edit'],
                },
                {
                    name: 'เพิ่มบริษัทประกันภัย',
                    reactIcon: FaMinus,
                    path: '/add-insurance-company',
                },
            ],
            reactIcon: IoShieldSharp,
            relatePath: ['/insurance-company-lists', '/insurance-company-lists/edit', '/add-insurance-company'],
        },
        {
            name: 'ยี่ห้อรถ',
            nodes: [
                {
                    name: 'ยี่ห้อรถทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/vehicle-brand-lists',
                    relatePath: ['/vehicle-brand-lists/edit'],
                },
                {
                    name: 'เพิ่มยี่ห้อรถ',
                    reactIcon: FaMinus,
                    path: '/add-vehicle-brand',
                },
            ],
            reactIcon: FaMotorcycle,
            relatePath: ['/vehicle-brand-lists', '/vehicle-brand-lists/edit', '/add-vehicle-brand'],
        },
        {
            name: 'รุ่นรถ',
            nodes: [
                {
                    name: 'รุ่นรถทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/vehicle-model-lists',
                    relatePath: ['/vehicle-model-lists/edit'],
                },
                {
                    name: 'เพิ่มรุ่นรถ',
                    reactIcon: FaMinus,
                    path: '/add-vehicle-model',
                },
            ],
            reactIcon: PiMotorcycleLight,
            relatePath: ['/vehicle-model-lists', '/vehicle-model-lists/edit', '/add-vehicle-model'],
        },
        {
            name: 'รายการอะไหล่',
            nodes: [
                {
                    name: 'รายการอะไหล่ทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/spare-part-lists',
                    relatePath: ['/spare-part-lists/edit'],
                },
                {
                    name: 'เพิ่มรายการอะไหล่',
                    reactIcon: FaMinus,
                    path: '/add-spare-part',
                },
            ],
            reactIcon: HiWrenchScrewdriver,
            relatePath: ['/spare-part-lists', '/spare-part-lists/edit', '/add-spare-part'],
        },
        {
            name: 'สี',
            nodes: [
                {
                    name: 'สีทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/vehicle-color-lists',
                    relatePath: ['/vehicle-color-lists/edit'],
                },
                {
                    name: 'เพิ่มสี',
                    reactIcon: FaMinus,
                    path: '/add-vehicle-color',
                },
            ],
            reactIcon: IoColorFilter,
            relatePath: ['/vehicle-color-lists', '/vehicle-color-lists/edit', '/add-vehicle-color'],
        },
        {
            name: 'ตำแหน่งงาน',
            nodes: [
                {
                    name: 'ตำแหน่งงานทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/job-position-lists',
                    relatePath: ['/job-position-lists/edit'],
                },
                {
                    name: 'เพิ่มตำแหน่งงาน',
                    reactIcon: FaMinus,
                    path: '/add-job-position',
                },
            ],
            reactIcon: GrWorkshop,
            relatePath: ['/job-position-lists', '/job-position-lists/edit', '/add-job-position'],
        },
    ];
    const companyAndEmployeeMenu: Node[] = [
        {
            name: 'ข้อมูลบริษัท',
            nodes: [
                {
                    name: 'เกี่ยวกับบริษัท',
                    reactIcon: FaMinus,
                    path: '/about-company',
                    relatePath: ['/company-branch/edit'],
                },
                {
                    name: 'แก้ไขข้อมูลบริษัท',
                    reactIcon: FaMinus,
                    path: '/edit-company',
                },
                {
                    name: 'เพิ่มสาขา',
                    reactIcon: FaMinus,
                    path: '/add-company-branch',
                },
            ],
            reactIcon: PiBuildingOfficeDuotone,
            relatePath: ['/about-company', '/add-company-branch', '/edit-company'],
        },
        {
            name: 'พนักงาน',
            nodes: [
                {
                    name: 'พนักงานทั้งหมด',
                    reactIcon: FaMinus,
                    path: '/employee-lists',
                    relatePath: ['/employee-lists/edit'],
                },
                {
                    name: 'เพิ่มพนักงาน',
                    reactIcon: FaMinus,
                    path: '/add-employee',
                },
            ],
            reactIcon: FaUserGroup,
            relatePath: ['/employee-lists', '/employee-lists/edit', '/add-employee'],
        },
    ];
    const othersMenu: Node[] = [
        {
            name: 'Logout',
            nodes: [],
            reactIcon: FiLogOut,
            path: '/login',
            noSubMenu: true,
        },
    ];

    const dispatch = useDispatch<AppDispatch>();
    const sideBarRef = useRef<HTMLDivElement | null>(null);
    const { isSidebarOpen } = useSelector((state: RootState) => state.sidebarDataStateValue);

    const handleClickOutsideSideBar = useCallback((event: MouseEvent) => {
        if (!sideBarRef.current) return;

        const dialogDimensions = sideBarRef.current.getBoundingClientRect();
        if (
            event.clientX < dialogDimensions.left ||
            event.clientX > dialogDimensions.right ||
            event.clientY < dialogDimensions.top ||
            event.clientY > dialogDimensions.bottom
        ) {
            if (isSidebarOpen) dispatch(setSidebarDatas({ value: false, variableName: 'isSidebarOpen' }))

        }
    }, [isSidebarOpen, dispatch]); // ถ้าไม่ใส่ isOpen เอาไว้ ตัว function จะใช้ค่า isOpen = false เสมอเพราะว่าไม่ได้ regenerate ใหม่ถึงแม้ว่า isOpen จะอัพเดทค่าเป็น true แล้วก็ตาม | แต่ sideBarRef และ isClickingRef ไม่ใส่ก็อัพเดทค่าใหม่ตลอด ---> เดาได้ 2 กรณี: 1. ใน useCallback ค่าของตัวแปรไม่อัพเดทถ้าตัวแปรนั้นมาจาก useState 2. ใน useCallback ค่าของ useRef จะอัพเดทอัตโนมัติเสมอ

    useEffect(() => {
        if (isSidebarOpen) document.addEventListener('click', handleClickOutsideSideBar);
        else document.removeEventListener('click', handleClickOutsideSideBar);

        return () => {
            document.removeEventListener('click', handleClickOutsideSideBar);
        };
    }, [isSidebarOpen]);
    return (
        <div ref={sideBarRef} className={`w-[265px] bg-lightGrey dark:bg-intenseFadeBlack min-h-sidebarHeight ${className}`}>
            <div className='sticky top-0.5 max-h-sidebarHeight overflow-auto hide-scrollbar'>
                <SidebarRecursive nodes={claimHistoryMenu} />
                <div className='pl-2 pt-3 text-orange'>เอกสาร</div>
                <SidebarRecursive nodes={documentMenu} />
                <div className='pl-2 pt-3 text-orange'>ข้อมูล Dropdown List</div>
                <SidebarRecursive nodes={dropdownListMenu} />
                <div className='pl-2 pt-3 text-orange'>ข้อมูลบริษัท และพนักงาน</div>
                <SidebarRecursive nodes={companyAndEmployeeMenu} />
                <div className='pl-2 pt-3 opacity-0 select-none'>Hidden</div>
                <SidebarRecursive nodes={othersMenu} />
            </div>
        </div>
    )
}
