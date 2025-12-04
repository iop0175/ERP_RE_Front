import { useEffect, useState } from "react";
import "@/styles/css/pages/approval/Purchase.css";

interface PurchaseProps {
    setPurchaseData: (data: {
        items: Item[];
        reason: string;
        vendor: string;
        memo: string;
    }) => void;
}

interface Item {
    itemName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    spec?: string;
    note?: string;
}

const Purchase: React.FC<PurchaseProps> = ({ setPurchaseData }) => {


    const [reason, setReason] = useState("");
    const [vendor, setVendor] = useState("");
    const [memo, setMemo] = useState("");
    const [items, setItems] = useState<Item[]>([]);

    const [addItem, setAddItem] = useState(false);
    const [newItem, setNewItem] = useState<Item>({
        itemName: "",
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
        spec: "",
        note: ""
    });
    useEffect(() => {
        setPurchaseData({
            items,
            reason,
            vendor,
            memo
        });
    }, [items, reason, vendor, memo]);
    const handelDelteItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    }
    const handleAddItem = () => {
        if (!newItem.itemName || newItem.quantity <= 0 || newItem.unitPrice <= 0) {
            alert("Please enter valid item information.");
            return;
        }

        setItems(prev => [...prev, newItem]);

        setNewItem({
            itemName: "",
            quantity: 0,
            unitPrice: 0,
            totalPrice: 0,
            spec: "",
            note: ""
        });

        setAddItem(false);
    };

    const handleChange = (key: keyof Item, value: string | number) => {
        let updated = { ...newItem, [key]: value };

        if (key === "quantity" || key === "unitPrice") {
            updated.totalPrice = updated.quantity * updated.unitPrice;
        }

        setNewItem(updated);
    };

    return (
        <div className="purchase">

            <div className="purchase_itemList">
                <button onClick={() => setAddItem(prev => !prev)}>Add Item</button>

                {addItem && (
                    <div className="purchase_addItem">
                        <div>Item Name <input type="text" value={newItem.itemName}
                            onChange={e => handleChange("itemName", e.target.value)} /></div>

                        <div>Quantity <input type="number" value={newItem.quantity}
                            onChange={e => handleChange("quantity", Number(e.target.value))} /></div>

                        <div>Unit Price <input type="number" value={newItem.unitPrice}
                            onChange={e => handleChange("unitPrice", Number(e.target.value))} /></div>

                        <div>Total Price: {newItem.totalPrice}</div>

                        <div>Spec <input type="text" value={newItem.spec}
                            onChange={e => handleChange("spec", e.target.value)} /></div>

                        <div>Note <input type="text" value={newItem.note}
                            onChange={e => handleChange("note", e.target.value)} /></div>

                        <button onClick={handleAddItem}>Add</button>
                    </div>
                )}
                {items.map((item, index) => (
                    <div key={index} className="purchase_itemRow">
                        <div>Item Name:[{item.itemName}]</div>
                        <div>Quantity:[{item.quantity}]</div>
                        <div>Unit Price:[{item.unitPrice}]</div>
                        <div>Total Price:[{item.totalPrice}]</div>
                        <div>Spec:{item.spec ?(<>[{item.spec}]</>):<></>}</div>
                        <div>Note:{item.note ? (<>[{item.note}]</>):<></>}</div>
                        <button className="itemRow_delete" onClick={() => handelDelteItem(index)}>x</button>
                    </div>
                ))}
            </div>

            <div>
                <div>Reason</div>
                <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>

            <div>
                <div>Vendor</div>
                <input type="text" value={vendor} onChange={(e) => setVendor(e.target.value)} />
            </div>

            <div>
                <div>Memo</div>
                <input type="text" value={memo} onChange={(e) => setMemo(e.target.value)} />
            </div>

        </div>
    );
};

export default Purchase;
