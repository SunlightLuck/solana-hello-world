use anchor_lang::prelude::*;

declare_id!("");

#[program]
mod solana_hello_world {
    use super::*;
    pub fn create(ctx: Context<Create>) -> Result<()> {
        let base_account = &mut ctx->accounts.base_account;
        base_account.count = 0;
        Ok(());
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let base_account = &mut ctx->accounts.base_account;
        base_account.count += 1;
        Ok(());
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 1000)]
    pub base_account: Account<'info, BaseAccount>;
    #[account(mut)]
    pub user: Singer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>;
}

#[account]
#[derive(Default)]
pub struct BaseAccount {
    pub count: u64
}