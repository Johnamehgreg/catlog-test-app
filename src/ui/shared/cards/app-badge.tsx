import { Badge, BadgeText } from "@/components/ui/badge";

interface IAppBadge {
    action: 'success' | 'error' | 'warning' | 'info' | 'muted';
    variant: 'solid' | 'outline';
    size: 'sm' | 'md' | 'lg';
    children?: React.ReactNode;
    text: string;
}

export const AppBadge: React.FC<IAppBadge> = ({ action, variant, size, children, text }) => {
    return (
        <Badge
            action={action}
            variant={variant}
            size={size}
            className="bg-green-500"
        >
            <BadgeText size="md">{text}</BadgeText>
            {children}
        </Badge>
    );
}