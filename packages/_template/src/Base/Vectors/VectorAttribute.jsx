import { CardCapsule, SimpleCardCapsule, SimpleCardCapsuleRightCorner } from "../Components/CardCapsule"
import { NonPriorityAttributeValue } from "../Components/MediumContent"
import { Table } from "../Components/Table"
import { Col } from "../Components/Col"
import { Row } from "../Components/Row"
import { useState } from "react"
import { Link } from "../Components"

export const VectorAttributeFactory = (attribute_name) => ({ item }) => {
    const attribute_value = item?.[attribute_name] || []
    return (
        <Row key={attribute_name}>
            <Col className="col-2"><b>{attribute_name}</b></Col>
            <Col className="col-10">
                <CardCapsule item={item}>
                    <Table data={attribute_value} />
                </CardCapsule>
            </Col>
        </Row>
    )
}

export const VectorAttribute = ({ attribute_name, item }) => {
    const attribute_value = item?.[attribute_name] || []
    return (
        <CardCapsule item={item} header={<Link item={item} action={attribute_name}>{attribute_name+' []'}</Link> }>
            <Table data={attribute_value} />
        </CardCapsule>
    )
}

export const MediumCardVectors = ({ item }) => {
    return (
        <CardCapsule item={item} header={"Vektorové atributy"}>
            {Object.entries(item).map(([attribute_name, attribute_value]) => {
                if (Array.isArray(attribute_value)) {
                    return <VectorAttribute key={attribute_name} attribute_name={attribute_name} item={item} />
                } else {
                    return null
                }
            })}
        </CardCapsule>
    )
}

const isPlainObject = (v) =>
    v !== null &&
    typeof v === "object" &&
    !Array.isArray(v) &&
    (Object.getPrototypeOf(v) === Object.prototype || Object.getPrototypeOf(v) === null);

// --- NOVÝ ČISTÝ VÝPIS VŠECH DAT ---

const SimpleValue = ({ label, value }) => {
    return (
        <div className="d-flex border-bottom py-2 align-items-center" style={{ fontSize: "0.9rem" }}>
            {/* Název atributu fixně zarovnaný vlevo */}
            <div className="fw-bold text-dark" style={{ minWidth: "220px", paddingRight: "15px" }}>
                {label}
            </div>
            {/* Hodnota atributu */}
            <div className="text-secondary text-break font-monospace" style={{ flexGrow: 1 }}>
                {`${value}`}
            </div>
        </div>
    );
};

const TreeSimpleValues = ({ item }) => {
    return (
        <div className="p-3 bg-light border rounded mb-3">
            {Object.entries(item).map(([attribute_name, attribute_value]) => {
                // Nevynecháváme ŽÁDNÁ data, pouze filtrujeme objekty a pole (ty se vykreslí níže)
                if (attribute_value === null) return null;
                if (Array.isArray(attribute_value)) return null;
                if (isPlainObject(attribute_value)) return null;

                return (
                    <SimpleValue 
                        key={attribute_name} 
                        label={attribute_name} 
                        value={attribute_value} 
                    />
                );
            })}
        </div>
    );
};

const TreeDict = ({ title, item, isRoot = false }) => {
    // Hlavní uzel necháme otevřený, vnořené zavřené
    const [collapsed, setCollapsed] = useState(!isRoot); 
    const toggle = () => setCollapsed(prev => !prev);

    return (
        <SimpleCardCapsule 
            title={
                <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="fw-bold text-primary text-uppercase">
                        {`${title} `} <Link item={item} />
                    </span>
                    <button className="btn btn-sm btn-outline-secondary border-0" onClick={toggle}>
                        <b>{collapsed ? "Zobrazit" : "Skrýt"}</b>
                    </button>
                </div>
            }
        >
            {!collapsed && <TreeSimpleValues item={item} />}
            
            {!collapsed && (
                <div className="mt-2">
                    {Object.entries(item).map(([attribute_name, attribute_value]) => {
                        if (Array.isArray(attribute_value)) return null;
                        if (isPlainObject(attribute_value)) return (
                            <div className="mb-2" key={attribute_name}>
                                <TreeDict title={attribute_name} item={attribute_value} /> 
                            </div>      
                        );
                        return null;
                    })}
                    {Object.entries(item).map(([attribute_name, attribute_value]) => {
                        if (Array.isArray(attribute_value)) return (
                            <div className="mb-2" key={attribute_name}>
                                <TreeArray title={`${attribute_name}`} items={attribute_value} />
                            </div>
                        );
                        return null;
                    })}
                </div>
            )}
        </SimpleCardCapsule>
    );
};

const TreeArray = ({ title, items }) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggle = () => setCollapsed(prev => !prev);

    return (
        <SimpleCardCapsule 
            title={
                <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="fw-bold text-uppercase">
                        {`${title} [${items?.length}]`}
                    </span>
                    <button className="btn btn-sm btn-outline-secondary border-0" onClick={toggle}>
                        <b>{collapsed ? "Zobrazit" : "Skrýt"}</b>
                    </button>
                </div>
            }
        >
            {!collapsed && (
                <div className="mt-2 ps-3 border-start border-3 border-primary">
                    {items?.map((item, index) => (
                        <div key={item?.id || index} className="mb-2">
                            <TreeDict title={`Položka [${index}] `} item={item} />
                        </div>
                    ))}
                </div>
            )}
        </SimpleCardCapsule>
    );
};

export const Tree = ({ item }) => {
    return (
        <TreeDict title={"TREE"} item={item} isRoot={true} />
    );
};