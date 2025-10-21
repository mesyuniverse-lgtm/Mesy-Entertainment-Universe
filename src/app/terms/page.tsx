
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
          <CardDescription>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-invert prose-p:text-muted-foreground prose-h2:text-primary prose-h3:text-foreground max-w-none">
          <p>Welcome to the MESY Entertainment Universe. These Terms of Service ("Terms") govern your access to and use of our platform. By creating a User Account or Member ID, you agree to be bound by these Terms.</p>
          
          <h2 id="definitions">1. Key Definitions</h2>
          <ul>
              <li><strong>User Account:</strong> An account created by an individual to access the MESY platform. A User Account is required to perform transactions, earn income, and manage Member IDs.</li>
              <li><strong>Member ID:</strong> A unique identity within the MESY membership structure. A Member ID represents a position in the downline network and is eligible for income based on the Membership Plan. Each Member ID is owned and managed by a User Account.</li>
          </ul>

          <h2 id="user-accounts">2. User Accounts</h2>
          <h3>2.1 Account Tiers</h3>
          <ul>
              <li><strong>Verified User:</strong> A user who has completed the identity verification process. Verified Users have full access to all platform features, including the ability to perform financial transactions, earn income, and register new Member IDs.</li>
              <li><strong>Guest User (Unverified):</strong> A user who has not completed identity verification. Guest Users have limited, free, trial access to certain features for exploration purposes but cannot perform financial transactions, earn income, or register Member IDs.</li>
          </ul>
          <h3>2.2 Account Creation</h3>
          <p>An individual may create and own multiple User Accounts, provided that each account is registered with a unique set of credentials and complies with these Terms.</p>

          <h2 id="member-ids">3. Member IDs</h2>
          <h3>3.1 Registration Requirements</h3>
          <ul>
              <li>Only a Verified User can register new Member IDs.</li>
              <li>There is no limit to the number of Member IDs a single User Account can own and manage.</li>
              <li>Membership is for life.</li>
          </ul>
          <h3>3.2 Eligibility</h3>
          <p>MESY embraces inclusivity. Member IDs can be registered for anyone or anything, including:</p>
          <ul>
              <li><strong>Individuals of any age:</strong> There are no age restrictions to hold a Member ID.</li>
              <li><strong>Newborns:</strong> A parent or legal guardian with a Verified User Account can register and manage a Member ID for a newborn.</li>
              <li><strong>Pets and other entities:</strong> A Verified User can register a Member ID for a pet, a project, or another entity they wish to include in their network. The User Account holder is fully responsible for managing these IDs.</li>
          </ul>
          
          <h2 id="guardianship">4. Guardianship and Minors</h2>
          <ul>
              <li>For any Member ID registered for a child under the age of 14, the parent or legal guardian's Verified User Account must act as the custodian. The guardian is responsible for all activities and management of the Member ID.</li>
              <li>Upon reaching the age of 14, the child may, with the guardian's consent, take over management of their own Member ID by linking it to their own Verified User Account.</li>
          </ul>

          <h2 id="conduct-violations">5. Code of Conduct and Violations</h2>
          <h3>5.1 Prohibited Actions</h3>
          <p>All users and members must adhere to our Community Standards. Actions that violate these standards, including but not limited to fraud, harassment, or distribution of malicious content, will result in disciplinary action.</p>
          <h3>5.2 Penalties</h3>
          <p>In the event of a severe violation of these Terms or our Community Standards, MESY reserves the right to take the following actions:</p>
          <ul>
              <li><strong>Account Suspension:</strong> The offending User Account and all associated Member IDs will be temporarily blocked.</li>
              <li><strong>Forfeiture of Income:</strong> All accumulated but unpaid income across all Member IDs managed by the suspended User Account will be immediately and irrevocably forfeited to the MESY system.</li>
              <li><strong>Account Recovery:</strong> The user may apply to have their account reinstated through our recovery process. If the appeal is successful, the account will be unblocked. However, any forfeited income will not be returned. The ability to earn new income will be restored from the point of reinstatement.</li>
          </ul>

        </CardContent>
      </Card>
    </div>
  );
}
